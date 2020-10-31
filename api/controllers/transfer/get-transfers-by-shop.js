module.exports = {


  friendlyName: 'Get transfers by shop',


  description: '',


  inputs: {
    shop: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({shop}) {
    let transfers;

    try {
      transfers = await  Transfers.find({
        or: [
          {'shopSource': shop},
          {'shopDestination': shop}
        ]
      })
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
      sails.helpers.printError({title: 'getTransfersByShop', message: e.message}, this.req);
      throw e;
    }

  }


};
