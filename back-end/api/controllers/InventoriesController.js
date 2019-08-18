/**
 * inventories
 *
 * @description :: Server-side logic for managing inventories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  create:function (req, res) {
    //Validate data
    if(!req.body.inventory || !req.body.products){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:new Error("error_G01")};
      return res.generalAnswer(things);
    }


    try {
      req.body.products = JSON.parse(req.body.products);
      req.body.inventory = JSON.parse(req.body.inventory);
    } catch (e) {
      // console.error(e);
    }

    let products = req.body.products;
    // console.log(req.body);

    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        //Primero creo el inventario
        let newInventory,employeesInventory,inventoriesProducts, things;
        try {
          newInventory = await Inventories.create(req.body.inventory).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        //Una vez creado el inventario, le asocio el usuari
        try {
          employeesInventory = await EmployeesInventories.create({inventory:newInventory.id,employee:req.employee.id}).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        try {
          products.forEach(product => product.inventory = newInventory.id);
          inventoriesProducts = await InventoriesHasProducts.createEach(products).usingConnection(db).fetch();
          things = {code: '', data: {
              inventory:newInventory,
              employeesInventory:employeesInventory,
              products: inventoriesProducts
            }, error: null, propio: false, bd: false};
          return proceed(null, things);
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
      })
      .then(function (operation) {
            return res.generalAnswer(operation);
        })
      .catch(function (error) {
        error = error.raw;
        return res.generalAnswer(error);
        });
  },


  /**
  Este servicio web se encarga de adjuntar productos a un inventario colaborativo ya existente
  */
  attach: async function(req, res){
    let inventory, things, employessInventory,inventoriesProducts;
    //Validate data
    if(!req.body.inventory || !req.body.products){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    // try {
    //   req.body.products = JSON.parse(req.body.products);
    //   req.body.inventory = JSON.parse(req.body.inventory);
    // } catch (e) {
    //   things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
    //   return res.generalAnswer(things);
    // }
    let products = req.body.products;
    try {
      inventory = await Inventories.findOne({id: req.body.inventory.id});
      if(inventory.collaborative){
        sails.getDatastore()
          .transaction(async (db,proceed)=> {

            //Una vez creado el inventario, le asocio el usuari
            try {
              employessInventory = await EmployeesInventories.create({inventory:inventory.id,employee:req.employee.id}).usingConnection(db).fetch();
            } catch (err) {
              things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
              return proceed(things);
            }
            try {
              products.forEach(ip => ip.inventory = inventory.id);
              inventoriesProducts = await InventoriesHasProducts.createEach(products).usingConnection(db).fetch();
              things = {code: '', data: {
                  inventory:inventory,
                  employeesInventory:employessInventory,
                  products: inventoriesProducts
                }, error: null, propio: false, bd: false};
              return proceed(null, things);
            } catch (err) {
              things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
              return proceed(things);
            }
          })
          .then(function (operation) {
            return res.generalAnswer(operation);
          })
          .catch(function (error) {
            error = error.raw;
            return res.generalAnswer(error);
          });
      }
    } catch (e) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }

    // console.log(req.body);


  },

    /**
    * Esta funcion se encargara de listar los inventories creados y no consolidados, con el fin de seleccionar inventories
    * para consolidar
     *
     * 1-> Busco los usuario que pertenecen a una compania
     * 2-> Busco los inventories creados por esos usuarios
     * @param tipo: consolidado inventories consolidado (inventories_consilidados_id>0)
     * @param tipo: no_consolidado inventories sin consolidar (inventories_consilidados_id=0)
     * @param colaborativo: boolean, determia si se listan parciales o colaborativos
    */
  list: async function(req,res){
      let employees, inventories, things;
      try {
         employees = await  Employees.find({
           where:{company: req.employee.company.id}
         })
           .populate('inventories',{
             where:{
               consolidatedInventory:
               /** Si es consolidado, busque aquellos con consolidatedInventory mayor a 1,
                *  Si es no_consolidado busque aquellos con consolidatedInventory igual 1
                *  Si es all busque todos*/
                 (req.body.tipo == 'consolidado' ? {'>': 1} : req.body.tipo == "no_consolidado" ? {'=':1} : {'>=':1 }),
               collaborative: req.body.collaborative
             }
           });
         //Se elimina la informacion innecesaria y se muestra solo los inventories de cada empleado
        inventories = employees.map(a => a.inventories);
        things = {code: '', data: inventories[0], error: null, propio: false, bd: false};
         return res.generalAnswer(things);
      } catch (err) {
        things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
        return res.generalAnswer(things);
      }
    },






  /**
   * Este servicio web se encargara de consolidar dos inventories parciales, deben ser fechas diferentes pero la misma zona
   *
   * 1-> Se crea un nuevo inventario consolidado.
   * 2-> Se asocian los inventories parciales al inventario consolidado
   *
   * @param req
   * inventories_id: Id de los inventories a consolidar
   * @param res
   */
  consolidar:function (req, res) {
    let invC,things,inv,inventories;

    try {
      req.body.inventory = JSON.parse(req.body.inventory);
    } catch (e) {
    }

    sails.getDatastore()
      .transaction(async (db,proceed)=> {
        var totalProductos=0;
        //Se valida que la zona de los inventories sean diferentes
        try {
          inventories = await inventories.find(
            {
              where: {id: req.body.inventory},
              select: ['zonas_id', 'consolidatedInventory']
            }).populate("productos_zona");
          zonas = inventories.map(a => a.zonas_id);
          inventories = inventories.every(function (inventory, index) {
            totalProductos+=inventory.productos_zona.length;
            //Valido que los inventories sean de zonas diferentes
            if(zonas.includes(inventory.zonas_id,index+1)){
              things = {code: 'error_I01', data: [], propio: true, bd: null, error: new Error('error_I01')};
              return false;
              //Valido que los inventories no se hayan consolidado antes
            }else if (inventory.consolidatedInventory && inventory.consolidatedInventory>1){
              things = {code: 'error_I02', data: [], propio: true, bd: null, error: new Error('error_I02')};
              return false;
            }
            else{
              return true;
            }

          });
          if(!inventories)
            return proceed(things);
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }


        //1 -> Se crea un nuevo inventario consolidado.

        try {
          invC = await ConsolidatedInventories.create({employee:req.employee.id, name:req.body.name,productos:totalProductos}).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }


        //2 -> Se asocian los inventories parciales al inventario consolidado
        try {
          inv = await inventories.update(
            {
              id: req.body.inventory
            })
            .set(
              {
                consolidatedInventory: invC.id
              })
            .usingConnection(db).fetch();
          things =
            {
              code: 'OK',
              data: {
                inventories:inv,
                inventories_consolidados: invC
              },
              error: null,
              propio: false,
              bd: false
            };
          return proceed(null, things);
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }

      })
      .then(function (operation) {
        return res.generalAnswer(operation);
      })
      .catch(function (error) {
        error = error.raw;
        return res.generalAnswer(error);
      });
  },

  /**
   * Este servicio web se encarga de listar inventories
   *
   * @param inventario_id: consolidado inventories consolidado (inventories_consilidados_id>0)
   */
  listarProductos: async function (req, res) {
    let inventario_id, inventory,things;
    inventario_id= req.body.inventory;
    if(inventario_id){
      try {
        inventory = await inventories.findOne({id: inventario_id})
          .populate(products);
        async.each(inventory.productos_zona, async function(element, cb){
          let producto = await Products.findOne({id:element.product});
          if(producto)
            element.product = producto;
          cb();
        }, function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          things.data = inventory;
          return res.generalAnswer(things);
        });

      } catch (e) {
        things = {code: e.number, data: [], error: e};
        return res.generalAnswer(things);
      }

    }
  }
};
