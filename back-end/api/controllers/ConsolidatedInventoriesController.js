/**
 * inventories
 *
 * @description :: Server-side logic for managing inventories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {


  /**
   * List all the colaborative consolidated inventories of the company of the current user
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  list: async function(req,res){
      let consolidatedInventories, returnData, employeeIventories = [], employees;
      try {

        employees = await  Employees.find({
          where:{company: req.employee.company.id}
        })
          .populate('inventories',{
            where:{
              consolidatedInventory: {'>': 0},
              collaborative: req.body.collaborative
            }
          });
        //Se elimina la informacion innecesaria y se muestra solo los inventories de cada empleado
        employees.forEach(function (employee) {
          if(employee.inventories){
            employee.inventories.forEach(async function (inventory) {
              employeeIventories.push(inventory);
            })
          }
        });
        employeeIventories = employeeIventories.map(a => a.consolidatedInventory);
        consolidatedInventories = await  ConsolidatedInventories.find({
          id: {in: employeeIventories}
        });

        returnData = {code: '', data:consolidatedInventories , error: null, propio: false, bd: false};
         return res.generalAnswer(returnData);
      } catch (err) {
        returnData = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
        return res.generalAnswer(returnData);
      }
    },

  /**
   * List all the consolidated inventories of the company of the current user
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  listAll: async function(req,res){
    let consolidatedInventories, returnData, employeeIventories = [], employees;
    try {
      employees = await  Employees.find({
        where:{company: req.employee.company.id}
      })
        .populate('inventories',{
          where:{
            consolidatedInventory: {'>': 0}
          }
        });
      //Se elimina la informacion innecesaria y se muestra solo los inventories de cada empleado
      employees.forEach(function (employee) {
        if(employee.inventories){
          employee.inventories.forEach(async function (inventory) {
            employeeIventories.push(inventory);
          })
        }
      });
      employeeIventories = employeeIventories.map(a => a.consolidatedInventory);
      consolidatedInventories = await  ConsolidatedInventories.find({
        id: {in: employeeIventories}
      });

      //Obtengo la cnatidad de productos de cada inventario consolidados
      returnData = {code: '', data:consolidatedInventories , error: null, propio: false, bd: false};
      return res.generalAnswer(returnData);
    } catch (err) {
      returnData = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(returnData);
    }
  },

  lastInventory: async function(req, res){
    let consolidatedInventory, things;
    try {

      //Busco el ultimo invnetario consolidado de este empleado
      consolidatedInventory = await
        ConsolidatedInventories.find({
            where:{
              employee:req.employee.id
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
            return res.generalAnswer(things);
          });
        }else{
          things = {code: '', data: [], error: null};
          return res.generalAnswer(things);
        }
      }
      else{
        things = {code: '', data: [], error: null};
        return res.generalAnswer(things);
      }




    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

  lastInventoryAdmin: async function(req, res){
    let consolidatedInventory, things;
    try {

      //Busco el ultimo invnetario consolidado de este empleado
      consolidatedInventory = await
        ConsolidatedInventories.find({
          where:{
            employee:req.body.id
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
            return res.generalAnswer(things);
          });
        }else{
          things = {code: '', data: [], error: null};
          return res.generalAnswer(things);
        }
      }
      else{
        things = {code: '', data: [], error: null};
        return res.generalAnswer(things);
      }




    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },
  /**
   * Esta funcion se encarga de buscar los inventories que pertenecen a un inventario consolidados, luego obtiene los
   * productos de dichos inventories y los retorna
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  listProducts: async function (req, res) {
    let consolidatedInventory, things;
    consolidatedInventory= req.body.consolidatedInventory;
    if(consolidatedInventory){
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
          return res.generalAnswer(things);
        });

      } catch (e) {
        things = {code: e.number, data: [], error: e};
        return res.generalAnswer(things);
      }

    }else{
      things = {code: '', data: [], error: null};
      return res.generalAnswer(things);
    }
  }


};
