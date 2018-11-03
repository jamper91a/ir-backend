/**
 * Inventarios
 *
 * @description :: Server-side logic for managing Inventarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  create:function (req, res) {
    //Validate data
    if(!req.body.inventario || !req.body.inventario_productos){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    var inventario_productos = req.body.inventario_productos;

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
          return res.generalAnswer(error);
        });


  }

};
