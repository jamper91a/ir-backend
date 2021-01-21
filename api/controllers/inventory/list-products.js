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
        if(sails.config.custom.rawQueries) {
          theInventory = await sails.helpers.queries.inventory.listProductsByInventory(inventory)
        } else {
          theInventory = await Inventories.findOne({id: inventory})
            .populate('zone')
            .populate('products');
          //Create list of products to find
          var productsToFind = theInventory.products.map(a => a.id);

          // Find the products using the productHasZone
          let products = await ProductsHasZones.find({id: productsToFind})
            .populate('product')
            .populate('zone')
            .populate('devolution')
            .populate('sell')
            .populate('epc');
          // .populate('product');
          //Add the products to the inventory
          theInventory.products = products
          //Format data
          theInventory = await sails.helpers.format.responses.inventory.listProducts(theInventory);
        }

        return {data:theInventory};
      } catch (e) {
        sails.helpers.printError({title: 'listProducts', message: e.message}, this.req, e);
        throw e;
      }

  }


};
