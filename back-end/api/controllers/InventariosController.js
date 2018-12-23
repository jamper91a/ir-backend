/**
 * Inventarios
 *
 * @description :: Server-side logic for managing Inventarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  crearParcial:function (req, res) {
    //Validate data
    if(!req.body.inventario || !req.body.inventario_productos){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let inventario_productos = req.body.inventario_productos;

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
    * Esta funcion se encargara de listar los inventarios creados y no consolidados, con el fin de seleccionar inventarios
    * para consolidar
     *
     * 1-> Busco los usuario que pertenecen a una compania
     * 2-> Busco los inventarios creados por esos usuarios
     * @param tipo: consolidado inventarios consolidado (inventarios_consilidados_id>0)
     * @param tipo: no_consolidado inventarios sin consolidar (inventarios_consilidados_id=0)
    */
  listarInventarios: async function(req,res){
      let empleados, inventarios, things;
      try {
         empleados = await  Empleados.find({
           where:{companias_id: req.empleado.companias_id.id}
         })
           .populate('inventarios',{
             where:{
               inventarios_consolidados_id:
               /*** Si es consolidado, busque aquellos con inventarios_consolidados_id mayor a 0, si no igual a 0*/
                 (req.body.tipo == 'consolidado' ? {'>': 0} : {'<=': 0})
             }
           });
         //Se elimina la informacion innecesaria y se muestra solo los inventarios de cada empleado
        inventarios = empleados.map(a => a.inventarios);
        things = {code: '', data: inventarios, error: null, propio: false, bd: false};
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
  consolidarParcial:function (req, res) {
    let invC,things,inv,inventarios;

    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        //Se valida que la zona de los inventarios sean diferentes
        try {
          inventarios = await Inventarios.find(
            {
              where: {id: req.body.inventarios_id},
              select: ['zonas_id', 'inventarios_consolidados_id']
            });
          zonas = inventarios.map(a => a.zonas_id);
          inventarios = inventarios.every(function (inventario, index) {
            //Valido que los inventarios sean de zonas diferentes
            if(zonas.includes(inventario.zonas_id,index+1)){
              things = {code: 'error_I01', data: [], propio: true, bd: null, error: null};
              return false;
              //Valido que los inventarios no se hayan consolidado antes
            }else if (inventario.inventarios_consolidados_id && inventario.inventarios_consolidados_id>0){
              things = {code: 'error_I02', data: [], propio: true, bd: null, error: null};
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
          invC = await InventariosConsolidados.create({empleados_id:req.empleado.id}).usingConnection(db).fetch();
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
              code: '',
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
  listarProductosInventario: async function (req, res) {
    let inventario_id, inventario,things;
    inventario_id= req.body.inventario_id;
    if(inventario_id){
      try {
        inventario = await Inventarios.find({id: inventario_id}).populate('productos_zona');
        async.each(inventario[0].productos_zona, async function(element, cb){
          let producto = await Productos.find({id:element.productos_id}).limit(1);
          if(producto.length>0)
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
