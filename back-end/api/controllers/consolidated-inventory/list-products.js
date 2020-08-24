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
        let inventories = await Inventories.find({consolidatedInventory: consolidatedInventory})
          .populate('products.product.company&supplier');

        for(const inventory of inventories) {
          for(const product of inventory.products) {
            zonesHasProducts.push(product);
          }
        }
        let consolidatedInventories = await ConsolidatedInventories.findOne({id:consolidatedInventory});
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
