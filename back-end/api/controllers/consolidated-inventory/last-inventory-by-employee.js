module.exports = {


  friendlyName: 'Last consolidated inventory',


  description: 'Find the last consolidated inventory of current user',


  inputs: {
    id: {
      type: 'number',
      description: 'Employee id',
      required: true
    }
  },


  exits: {
    noEmployee: {
      description: 'Employee not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({id}) {
    let employee = id;
    let consolidatedInventory = [];
    try {

      consolidatedInventory = await
        ConsolidatedInventories.find({
          where:{
            employee
          }
        })
          .sort('createdAt desc')
          .limit(1)
          .populate('inventories');
      if(consolidatedInventory && consolidatedInventory.length>0){
        consolidatedInventory = consolidatedInventory[0];
        if(consolidatedInventory.inventories){
          async.each(consolidatedInventory.inventories, async function(inventory, cb){
            try {
              let inv = await Inventories.findOne({where: {id: inventory.id}})
                .populate('products.zone&product&epc');
              for(const pz of inv.products){
                if(pz.product){
                  pz.product.company = { id: pz.product.company};
                  pz.product.supplier = { id: pz.product.supplier};
                }
                if(pz.zone){
                  pz.zone.shop = { id: pz.zone.shop};
                }
                if(pz.epc){
                  pz.epc.company = { id: pz.epc.company};
                  pz.epc.dealer = { id: pz.epc.dealer};
                }
              }
              if (inv)
                inventory.products = inv.products;

            } catch (e) {
              cb(e);
            }
            cb();
          }, function(error){
            let things={code: '', data:[], error:null};
            if(error){
              things.error=error;
            }
            things.data = consolidatedInventory;
            return things;
          });
        }else{
          return  [];
        }
      }
      return  [];
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }

  }


};
