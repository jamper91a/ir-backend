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

  },


  fn: async function ({shopSource, type}) {

    console.time('Get-Transfers-By-Type');
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
      let max = 0;
      do{
        max ++;
        //Lleno la informacion de cada produco_zona_has_transferencias
        for (let i = 0; i < transfers.length; i++) {
          let transfer = transfers[i];
          //Busco la informacion del usuario generador de la transferencia
          transfer.employee.user = users[i];
          let productsToFind = _.map(transfer.products, function (product) {
            return product.product;
          });
          let products = await ProductsHasZones.find({id: productsToFind}).populate('product')
            .populate('epc');
          for (let j = 0; j < transfer.products.length; j++) {
            //Busco la informacion de dichos elementos
            transfers[i].products[j].product = products[j];
          }
        }
      }while (max <= 1000);

      console.timeEnd('Get-Transfers-By-Type');
      return {data: transfers};
    } catch (e) {
      await sails.helpers.printError({title: 'getTransfersByType', message: e.message}, this.req);
      throw e;
    }

  }


};
