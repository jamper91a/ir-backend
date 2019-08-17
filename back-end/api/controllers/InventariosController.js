/**
 * inventories
 *
 * @description :: Server-side logic for managing inventories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  crear:function (req, res) {
    //Validate data
    if(!req.body.inventario || !req.body.inventario_productos){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:new Error("error_G01")};
      return res.generalAnswer(things);
    }


    try {
      req.body.inventario_productos = JSON.parse(req.body.inventario_productos);
      req.body.inventario = JSON.parse(req.body.inventario);
    } catch (e) {
      // console.error(e);
    }

    let inventario_productos = req.body.inventario_productos;
    // console.log(req.body);

    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        //Primero creo el inventario
        let inv,u_i,i_p, things;
        try {
          inv = await inventories.create(req.body.inventario).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        //Una vez creado el inventario, le asocio el usuari
        try {
          u_i = await Usersinventories.create({inventories_id:inv.id,empleados_id:req.employee.id}).usingConnection(db).fetch();
         //await inventories.addToCollection(inv.id, 'users', [req.employee.id]).usingConnection(db);
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        try {
          inventario_productos.forEach(ip => ip.inventories_id = inv.id);
          i_p = await inventoriesProductos.createEach(inventario_productos).usingConnection(db).fetch();
          things = {code: '', data: {
              inventories:inv,
              users_inventories:u_i,
              inventario_productos: i_p
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
  adjuntar: async function(req, res){
    let inv, things, u_i,i_p;
    //Validate data
    if(!req.body.inventario || !req.body.inventario_productos){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    req.body.inventario_productos =JSON.parse(req.body.inventario_productos);
    req.body.inventario =JSON.parse(req.body.inventario);
    let inventario_productos = req.body.inventario_productos;
    try {
      inv = await inventories.findOne({id: req.body.inventario.id});
      if(inv.colaborativo){
        sails.getDatastore()
          .transaction(async (db,proceed)=> {

            //Una vez creado el inventario, le asocio el usuari
            try {
              u_i = await Usersinventories.create({inventories_id:inv.id,empleados_id:req.employee.id}).usingConnection(db).fetch();
              //await inventories.addToCollection(inv.id, 'users', [req.employee.id]).usingConnection(db);
            } catch (err) {
              things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
              return proceed(things);
            }
            try {
              inventario_productos.forEach(ip => ip.inventories_id = inv.id);
              i_p = await inventoriesProductos.createEach(inventario_productos).usingConnection(db).fetch();
              things = {code: '', data: {
                  inventories:inv,
                  users_inventories:u_i,
                  inventario_productos: i_p
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
  listar: async function(req,res){
      let empleados, inventories, things;
      try {
         empleados = await  Employees.find({
           where:{company: req.employee.company.id}
         })
           .populate('inventories',{
             where:{
               consolidatedInventory:
               /** Si es consolidado, busque aquellos con consolidatedInventory mayor a 0,
                *  Si es no_consolidado busque aquellos con consolidatedInventory igual a 0 o 1
                *  Si es all busque todos*/
                 (req.body.tipo == 'consolidado' ? {'>': 1} : req.body.tipo == "no_consolidado" ? {'<=':1} : {'>=':0 }),
               colaborativo: req.body.colaborativo
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
      req.body.inventories_id = JSON.parse(req.body.inventories_id);
    } catch (e) {
    }

    sails.getDatastore()
      .transaction(async (db,proceed)=> {
        var totalProductos=0;
        //Se valida que la zona de los inventories sean diferentes
        try {
          inventories = await inventories.find(
            {
              where: {id: req.body.inventories_id},
              select: ['zonas_id', 'consolidatedInventory']
            }).populate("productos_zona");
          zonas = inventories.map(a => a.zonas_id);
          inventories = inventories.every(function (inventario, index) {
            totalProductos+=inventario.productos_zona.length;
            //Valido que los inventories sean de zonas diferentes
            if(zonas.includes(inventario.zonas_id,index+1)){
              things = {code: 'error_I01', data: [], propio: true, bd: null, error: new Error('error_I01')};
              return false;
              //Valido que los inventories no se hayan consolidado antes
            }else if (inventario.consolidatedInventory && inventario.consolidatedInventory>1){
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
          invC = await ConsolidatedInventories.create({empleados_id:req.employee.id, name:req.body.name,productos:totalProductos}).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }


        //2 -> Se asocian los inventories parciales al inventario consolidado
        try {
          inv = await inventories.update(
            {
              id: req.body.inventories_id
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
    let inventario_id, inventario,things;
    inventario_id= req.body.inventories_id;
    if(inventario_id){
      try {
        inventario = await inventories.findOne({id: inventario_id})
          .populate('productos_zona');
        async.each(inventario.productos_zona, async function(element, cb){
          let producto = await Productos.findOne({id:element.productos_id});
          if(producto)
            element.productos_id = producto;
          cb();
        }, function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          things.data = inventario;
          return res.generalAnswer(things);
        });

      } catch (e) {
        things = {code: e.number, data: [], error: e};
        return res.generalAnswer(things);
      }

    }
  }
};
