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
        theInventory = await Inventories.findOne({id: inventory}).populate('zone');
        // Find the products using the productHasZone
        let products = await ProductsHasZones.find({id: theInventory.products})
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
        return {data:theInventory};
      } catch (e) {
        sails.helpers.printError({title: 'listProducts', message: e.message}, this.req, e);
        throw e;
      }

  }


};
