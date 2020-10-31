module.exports = {


  friendlyName: 'Get transfers by type',


  description: 'Get the manifest from the transfers based on the type of transfers( in or out)',


  inputs: {
    shopSource: {
      type: 'number',
      required: true
    },
    type: {
      type: 'string',
      required: true,
      custom: function (type) {
        return type === sails.config.custom.TRANSFER_TYPE.IN || type === sails.config.custom.TRANSFER_TYPE.OUT
      }
    }
  },


  exits: {
    productsNoFound: {
      description: 'Some products were not found',
      responseType: 'serverError'
    }
  },


  fn: async function ({shopSource, type}) {

    let transfers;

    try {
      transfers = await  Transfers.find(
        type === 'entrada' ? {'shopDestination': shopSource} : {'shopSource': shopSource}
      )
        .populate('products')
        .populate('shopSource')
        .populate('employee')
        .populate('shopDestination');

      let usersToFind  = _.map(transfers, function (transfer) {
        return transfer.employee.user;
      });

      let users = await Users.find({id: usersToFind});
      //Lleno la informacion de cada produco_zona_has_transferencias
      for (let i = 0; i < transfers.length; i++) {
        let transfer = transfers[i];
        //Busco la informacion del usuario generador de la transferencia
        transfer.employee.user = users[i];
        let productsToFind = _.map(transfer.products, function (product) {
          return product.product;
        });
        let products = await ProductsHasZones.find({id: productsToFind})
          .populate('product')
          .populate('epc');
        //The products found must be the same amount that the products to find
        if(productsToFind.length!== products.length) {
          throw 'productsNoFound';
        }
        for (let j = 0; j < transfer.products.length; j++) {
          //Busco la informacion de dichos elementos
          transfers[i].products[j].product = products[j];
        }
      }
      return {data: transfers};
    } catch (e) {
      sails.helpers.printError({title: 'getTransfersByType', message: e.message}, this.req);
      throw e;
    }

  }


};
