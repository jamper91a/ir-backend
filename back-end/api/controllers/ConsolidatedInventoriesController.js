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

  ultimoInventario: async function(req, res){
    let inventoriesConsolidados, things;
    try {

      //Busco el ultimo invnetario consolidado de este empleado
      let inventarioConsolidado = await
        inventoriesConsolidados
          .find({
            where:{
              empleados_id:req.employee.id
            }
          })
          .sort('createdAt desc')
          .limit(1)
          .populate('inventories');
      if(inventarioConsolidado)
        inventarioConsolidado = inventarioConsolidado[0];
      async.each(inventarioConsolidado.inventories, async function(inventario, cb){
        let inv = await inventories.findOne({where:{id:inventario.id}}).populate('productos_zona');
        if(inv)
          inventario.productos_zona = inv.productos_zona;
        cb();
      }, function(error){
        let things={code: '', data:[], error:null};
        if(error){
          things.error=error;
        }
        things.data = inventarioConsolidado;
        return res.generalAnswer(things);
      });

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
  listarProductos: async function (req, res) {
    let consolidatedInventory, things;
    consolidatedInventory= req.body.consolidatedInventory;
    if(consolidatedInventory){
      try {
        let productosZona=[];
        inventories = await inventories.find({consolidatedInventory: consolidatedInventory})
          .populate('productos_zona');
        async.each(inventories, async function(inventario, cb){
          async.each(inventario.productos_zona, async function(element, cb){
            let producto = await Productos.findOne({id:element.productos_id});
            if(producto)
               element.productos_id = producto;
            productosZona.push(element);
            cb();
          }, function(error){
            cb(error);
          });

        }, async function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          inventarioConsolidado = await ConsolidatedInventories.findOne({id:consolidatedInventory});
          things.data = {
            productosZona: productosZona,
            inventoriesConsolidados: inventarioConsolidado
          };
          return res.generalAnswer(things);
        });

      } catch (e) {
        things = {code: e.number, data: [], error: e};
        return res.generalAnswer(things);
      }

    }
  }


};
