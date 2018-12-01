/**
 * Inventarios
 *
 * @description :: Server-side logic for managing Inventarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  createParcial:function (req, res) {
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
              select: ['zonas_id']
            });
          inventarios = inventarios.map(a => a.zonas_id);
          inventarios = inventarios.every(function (zonas_id, index) {
            if(inventarios.includes(zonas_id,index+1)){
              things = {code: 'error_I01', data: [], propio: true, bd: null, error: null};
              return false;
            }else{
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
  }
};
