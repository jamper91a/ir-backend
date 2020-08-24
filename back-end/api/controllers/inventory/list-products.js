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
        theInventory = await sails.helpers.format.responses.inventory.listProducts(theInventory);
        return {data:theInventory};
      } catch (e) {
        sails.helpers.printError({title: 'listProducts', message: e.message}, this.req, e);
        throw e;
      }

  }


};
