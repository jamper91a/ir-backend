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
    let  things;
      try {
        let zonesHasProducts=[];
        let inventories = await Inventories.find({consolidatedInventory: consolidatedInventory})
          .populate('products');
        async.each(inventories, async function(inventory, cb){
          async.each(inventory.products, async function(product, cb){
            let aux_product = await Products.findOne({id:product.product});
            if(aux_product)
              product.product = aux_product;
            zonesHasProducts.push(product);
            cb();
          }, function(error){
            cb(error);
          });

        }, async function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          let consolidatedInventories = await ConsolidatedInventories.findOne({id:consolidatedInventory});
          things.data = {
            products: zonesHasProducts,
            consolidatedInventories: consolidatedInventories
          };
          return things;
        });

      } catch (e) {
        things = {code: e.number, data: [], error: e};
        return things;
      }

  }


};
