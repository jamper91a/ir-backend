module.exports = {


  friendlyName: 'Finish transfer',


  description: '',


  inputs: {
    products: {
      type: 'json',
      required: true,
      custom: function (products) {
        const isArray = _.isArray(products);
        const allObjects = _.every(products, function (product) {
          return _.isObject(product) &&
            _.isNumber(product.id) && product.id>0 &&
            _.isNumber(product.transfer) && product.transfer>0 &&
            _.isNumber(product.product) && product.product>0

        });

        return isArray && allObjects;
      }
    }
  },


  exits: {

  },


  fn: async function ({products}) {

    let newProducts = new Array();

    return sails.getDatastore()
      .transaction(async (db)=> {
        await TransfersHasZonesProducts.update(_.map(products, 'id'), {state: 1}).usingConnection(db);
        for(const pht of products){
          //Find the zone where the product must go
          let transfer = await Transfers.findOne({id: pht.transfer});
          if(transfer){
            const transferDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
            try {
              let shopDestination = await Shops.findOne({id: transfer.shopDestination})
                .populate("zone", {limit: 1}).usingConnection(db);
              let pz = await ProductsHasZones.updateOne({id: pht.product}, {zone: shopDestination.zone[0].id, wasTransfered: 1, transfer_date: transferDate})                                                                 .usingConnection(db);
              newProducts.push(pz);
            } catch (e) {
              sails.helpers.printError({title: 'finishTransfer', message: e.message}, this.req);
              throw e;
            }
          }
        }
        return {data: newProducts};
      });
  }


};
