module.exports = {


  friendlyName: 'List products from a consolidated inventory',


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
        let zonesHasProducts=[], consolidatedInventories = [];
        if(sails.config.custom.rawQueries){
          try {
            const data = await sails.helpers.queries.ci.listProductsByConsolidatedInventory(consolidatedInventory);
            consolidatedInventories = data.ci;
            zonesHasProducts = data.products;
          } catch (e) {
            throw e;
          }
        } else {
          let inventories = await Inventories.find({consolidatedInventory: consolidatedInventory})
            .populate('products.zone&epc&sell&devolution&product.company&supplier');

          for(const inventory of inventories) {
            //Find the products
            for(const product of inventory.products) {
              zonesHasProducts.push(sails.helpers.format.formatProductHasZone(product));
            }
          }
          consolidatedInventories = await ConsolidatedInventories.findOne({id:consolidatedInventory});
        }



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
