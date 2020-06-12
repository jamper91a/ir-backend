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
    console.time('ListProducts');
    let  things=[];
      try {
        let zonesHasProducts=[];
        let inventories = await Inventories.find({consolidatedInventory: consolidatedInventory})
          .populate('products.product.company&supplier');

        for(const inventory of inventories) {
          for(const product of inventory.products) {
            zonesHasProducts.push(product);
          }
        }
        let things={code: '', data:[], error:null};
        let consolidatedInventories = await ConsolidatedInventories.findOne({id:consolidatedInventory});
        things.data = {
          products: zonesHasProducts,
          consolidatedInventories: consolidatedInventories
        };
        console.timeEnd('ListProducts');
        return things;

      } catch (e) {
        throw e;
      }

  }


};
