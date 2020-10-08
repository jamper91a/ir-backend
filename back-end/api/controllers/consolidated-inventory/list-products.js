module.exports = {


  friendlyName: 'Last consolidated inventory',


  description: 'Find the inventories belongs to a consolidated inventory, after get the products if each if the inventories' +
    'and return the information',


  inputs: {
    consolidatedInventory: {
      type: 'number',
      description: 'Id of the consolidated inventory'
    }
  },


  exits: {
    noEmployee: {
      description: 'Employee not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({consolidatedInventory}) {
      try {
        let zonesHasProducts=[];
        // //We search the inventories
        // let inventories = await Inventories.find({consolidatedInventory: consolidatedInventory});
        // //We search for the products that belongs to those inventories
        // var inventoryProducts = await InventoriesHasProducts.find({inventory: inventories});
        // inventoryProducts = inventoryProducts.map(a => a.product);
        // let products = await ProductsHasZone.find({inventoryProducts})
        //   .populate('product.company&supplier')

        let inventories = await Inventories.find({consolidatedInventory: consolidatedInventory})
          .populate('products.zone&epc&sell&devolution&product.company&supplier');

        for(const inventory of inventories) {
          //Find the products
          for(const product of inventory.products) {
            zonesHasProducts.push(sails.helpers.format.formatProductHasZone(product));
          }
        }
        let consolidatedInventories = await ConsolidatedInventories.findOne({id:consolidatedInventory});
        // zonesHasProducts = _.map(data.inventories, function (inventory) {
        //   return sails.helpers.format.formatProductHasZone(zonesHasProducts);
        // });
        // zonesHasProducts = await
        return {
          data: {
            products: zonesHasProducts,
            consolidatedInventories: consolidatedInventories
          }};

      } catch (e) {
        sails.helpers.printError(e, this.req, {consolidatedInventory});
        throw e;
      }

  }


};
