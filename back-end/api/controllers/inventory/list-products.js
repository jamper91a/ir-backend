module.exports = {


  friendlyName: 'List products',


  description: 'List products based on inventory id',


  inputs: {
    inventory: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({inventory}) {

    let theInventory;
      try {
        theInventory = await Inventories.findOne({id: inventory})
          .populate('products.product');
        //Format data
        if(theInventory.products) {
          theInventory.products = await _.map(theInventory.products, function (productHasZone) {
            return sails.helpers.format.formatProductHasZone(productHasZone);
          });
        }
        return {data:theInventory};
      } catch (e) {
        await sails.helpers.printError({title: 'listProducts', message: e.message}, this.req, e);
        throw e;
      }

  }


};
