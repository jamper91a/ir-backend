/**
 * InventariosProductos
 *
 * @description :: Server-side logic for managing InventariosProductos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  addProducto:function (req, res) {
    //Validate data
    if(!req.body.zona_id || !req.body.productos){
      let things={code: 'error_G01', req:req, res:res, data:[], error:null};
      return res.generalAnswer(things);
    }

    let inventario_productos = JSON.parse(req.body.inventario_productos);

    sails.getDatastore()
      .transaction(async (db,proceed)=>{

        async.each(productos_inventario, function (producto_inventario, cb) {
          ProductosZona.create(inventario_productos).usingConnection(db).fetch().then(function () {
            cb();
          }).catch(function (err) {
            let things={code: 'error_PZ01', req:req, res:res, data:[], error:err};
            cb(things);
          });
        }, function (error) {
          if(error)
          {
            return proceed(null,error);
          }else{
            let product = Productos.find({
              id: req.body.productos_id
            }).limit(1).usingConnection(db).then(function (product) {
              return product;
            }).catch(function (err) {
              let things={code: 'error_P01', req:req, res:res, data:[], error:err};
              return proceed(null,things);
            });
            //Actualizo los devices
            let epcs = Epcs.update(_.map(productos_zona, 'epcs_id'), {state: 1}).usingConnection(db).fetch().then(function (devices) {
              if(devices)
                return devices;
              else
                return [];
            }).catch(function (err) {
              let things={code: 'error_EPC02', req:req, res:res, data:[], error:err};
              return proceed(null,things);
            });

            Promise.all([
              product,
              epcs
            ]).then(function (values) {
              if(values){
                let things={code: '', req:req, res:res, data:values[1], error:null};
                return proceed(null,things);
              }else {
                let things={code: 'error_G05', req:req, res:res, data:[], error:null};
                return proceed(null, things);
              }

            }).catch(function (err) {
              let things={code: '', req:req, res:res, data:[], error:err};
              return proceed(null,things);
            });
          }

        });






      }).then(function (operation) {
      return res.generalAnswer(operation);

    }).catch(function (error) {
      return res.generalAnswer(error);
    });
  }

};
