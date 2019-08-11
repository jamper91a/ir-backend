/**
 * Inventarios
 *
 * @description :: Server-side logic for managing Inventarios
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
          inv = await Inventarios.create(req.body.inventario).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        //Una vez creado el inventario, le asocio el usuari
        try {
          u_i = await UsersInventarios.create({inventarios_id:inv.id,empleados_id:req.empleado.id}).usingConnection(db).fetch();
         //await Inventarios.addToCollection(inv.id, 'users', [req.empleado.id]).usingConnection(db);
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        try {
          inventario_productos.forEach(ip => ip.inventarios_id = inv.id);
          i_p = await InventariosProductos.createEach(inventario_productos).usingConnection(db).fetch();
          things = {code: '', data: {
              inventarios:inv,
              users_inventarios:u_i,
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
      inv = await Inventarios.findOne({id: req.body.inventario.id});
      if(inv.colaborativo){
        sails.getDatastore()
          .transaction(async (db,proceed)=> {

            //Una vez creado el inventario, le asocio el usuari
            try {
              u_i = await UsersInventarios.create({inventarios_id:inv.id,empleados_id:req.empleado.id}).usingConnection(db).fetch();
              //await Inventarios.addToCollection(inv.id, 'users', [req.empleado.id]).usingConnection(db);
            } catch (err) {
              things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
              return proceed(things);
            }
            try {
              inventario_productos.forEach(ip => ip.inventarios_id = inv.id);
              i_p = await InventariosProductos.createEach(inventario_productos).usingConnection(db).fetch();
              things = {code: '', data: {
                  inventarios:inv,
                  users_inventarios:u_i,
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
    * Esta funcion se encargara de listar los inventarios creados y no consolidados, con el fin de seleccionar inventarios
    * para consolidar
     *
     * 1-> Busco los usuario que pertenecen a una compania
     * 2-> Busco los inventarios creados por esos usuarios
     * @param tipo: consolidado inventarios consolidado (inventarios_consilidados_id>0)
     * @param tipo: no_consolidado inventarios sin consolidar (inventarios_consilidados_id=0)
     * @param colaborativo: boolean, determia si se listan parciales o colaborativos
    */
  listar: async function(req,res){
      let empleados, inventarios, things;
      try {
         empleados = await  Empleados.find({
           where:{companias_id: req.empleado.companias_id.id}
         })
           .populate('inventarios',{
             where:{
               inventarios_consolidados_id:
               /** Si es consolidado, busque aquellos con inventarios_consolidados_id mayor a 0,
                *  Si es no_consolidado busque aquellos con inventarios_consolidados_id igual a 0 o 1
                *  Si es all busque todos*/
                 (req.body.tipo == 'consolidado' ? {'>': 1} : req.body.tipo == "no_consolidado" ? {'<=':1} : {'>=':0 }),
               colaborativo: req.body.colaborativo
             }
           });
         //Se elimina la informacion innecesaria y se muestra solo los inventarios de cada empleado
        inventarios = empleados.map(a => a.inventarios);
        things = {code: '', data: inventarios[0], error: null, propio: false, bd: false};
         return res.generalAnswer(things);
      } catch (err) {
        things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
        return res.generalAnswer(things);
      }
    },






  /**
   * Este servicio web se encargara de consolidar dos inventarios parciales, deben ser fechas diferentes pero la misma zona
   *
   * 1-> Se crea un nuevo inventario consolidado.
   * 2-> Se asocian los inventarios parciales al inventario consolidado
   *
   * @param req
   * inventarios_id: Id de los inventarios a consolidar
   * @param res
   */
  consolidar:function (req, res) {
    let invC,things,inv,inventarios;

    try {
      req.body.inventarios_id = JSON.parse(req.body.inventarios_id);
    } catch (e) {
    }

    sails.getDatastore()
      .transaction(async (db,proceed)=> {
        var totalProductos=0;
        //Se valida que la zona de los inventarios sean diferentes
        try {
          inventarios = await Inventarios.find(
            {
              where: {id: req.body.inventarios_id},
              select: ['zonas_id', 'inventarios_consolidados_id']
            }).populate("productos_zona");
          zonas = inventarios.map(a => a.zonas_id);
          inventarios = inventarios.every(function (inventario, index) {
            totalProductos+=inventario.productos_zona.length;
            //Valido que los inventarios sean de zonas diferentes
            if(zonas.includes(inventario.zonas_id,index+1)){
              things = {code: 'error_I01', data: [], propio: true, bd: null, error: new Error('error_I01')};
              return false;
              //Valido que los inventarios no se hayan consolidado antes
            }else if (inventario.inventarios_consolidados_id && inventario.inventarios_consolidados_id>1){
              things = {code: 'error_I02', data: [], propio: true, bd: null, error: new Error('error_I02')};
              return false;
            }
            else{
              return true;
            }

          });
          if(!inventarios)
            return proceed(things);
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }


        //1 -> Se crea un nuevo inventario consolidado.

        try {
          invC = await InventariosConsolidados.create({empleados_id:req.empleado.id, name:req.body.name,productos:totalProductos}).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }


        //2 -> Se asocian los inventarios parciales al inventario consolidado
        try {
          inv = await Inventarios.update(
            {
              id: req.body.inventarios_id
            })
            .set(
              {
                inventarios_consolidados_id: invC.id
              })
            .usingConnection(db).fetch();
          things =
            {
              code: 'OK',
              data: {
                inventarios:inv,
                inventarios_consolidados: invC
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
   * Este servicio web se encarga de listar inventarios
   *
   * @param inventario_id: consolidado inventarios consolidado (inventarios_consilidados_id>0)
   */
  listarProductos: async function (req, res) {
    let inventario_id, inventario,things;
    inventario_id= req.body.inventarios_id;
    if(inventario_id){
      try {
        inventario = await Inventarios.findOne({id: inventario_id})
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
