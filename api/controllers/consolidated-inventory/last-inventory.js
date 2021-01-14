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
    let employee = null;
    try {
      employee = this.req.employee.id;
    } catch (e) {
      throw 'noEmployee';
    }
    let consolidatedInventory = [];


    if(!sails.config.custom.rawQueries){
      try {
        consolidatedInventory = await sails.helpers.queries.ci.lastInventory(employee);
        consolidatedInventory.inventories = await sails.helpers.queries.ci.getInventoriesByCi(consolidatedInventory.id);
        //Get the products of each inventory
        for (const inventory of consolidatedInventory.inventories) {
          const products = await sails.helpers.queries.inventoriesHasProducts.getProductsByInventory(inventory.id);
          inventory.products = products;
        }
      } catch (e) {
        throw e;
      }
    } else {
      try {

        consolidatedInventory = await
          ConsolidatedInventories.find({
            where:{
              employee
            }
          })
            .sort('createdAt desc')
            .limit(1)
            .populate('inventories.products.zone&epc&product');
        if(consolidatedInventory && consolidatedInventory.length>0){
          consolidatedInventory = consolidatedInventory[0];
          if(consolidatedInventory.inventories){
            //Format data
            consolidatedInventory = await sails.helpers.format.responses.consolidatedInventory.lastConsolidatedInventory(consolidatedInventory);

          }else{
            return  {data: []};
          }
        }
      } catch (err) {
        let things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
        return things;
      }
    }
    return {data:consolidatedInventory};



  }


};
