module.exports = {


  friendlyName: 'Last consolidated inventory',


  description: 'Find the last consolidated inventory of current user',


  inputs: {
  },


  exits: {
    noEmployee: {
      description: 'Employee not found',
      responseType: 'badRequest'
    }
  },


  fn: async function () {
    //LastInventory: 13790.415ms
    console.time('LastInventory');
    let employee = null;
    try {
      employee = this.req.employee.id;
    } catch (e) {
      throw 'noEmployee';
    }
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
          // .populate('inventories.products.zone&epc&product.company&supplier');
          .populate('inventories.products.zone&epc&product');
      if(consolidatedInventory && consolidatedInventory.length>0){
        consolidatedInventory = consolidatedInventory[0];
        if(consolidatedInventory.inventories){
          for(const inventory of consolidatedInventory.inventories) {
            for(const pz of inventory.products) {
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
          }
          let things={code: '', data:[], error:null};
          things.data = consolidatedInventory;
          console.timeEnd('LastInventory');
          return things;
        }else{
          return  [];
        }
      }
      return  [];
    } catch (err) {
      let things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return things;
    }

  }


};
