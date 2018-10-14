/**
 * ProductosZona
 *
 * @description :: Server-side logic for managing ProductosZona
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        ProductosZona.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        ProductosZona.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        ProductosZona.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        ProductosZona.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('productosZona/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        ProductosZona.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/productosZona');
        });
    },

    addMercancia:function (req, res, next) {
      //Validate data
      if(!req.body.productos_zona || !req.body.productos_id){
        return res.serverError("Datos no validos");
      }

      var productos_zona = JSON.parse(req.body.productos_zona);

      sails.getDatastore()
        .transaction(async (db,proceed)=>{

          async.each(productos_zona, function (producto_zona, cb) {
            ProductosZona.create(producto_zona).usingConnection(db).fetch().then(function (aux) {
              cb();
            }).catch(function (err) {
              console.error(err.error);
              cb(new Error("Incoveniente al crear los registros de dispositivo y producto: "+producto_zona.epcs_id));

              //return null;
            });
          }, function (error) {
            if(error)
            {
              return proceed(error);
            }else{
              let product = Productos.find({
                  id: req.body.productos_id
              }).limit(1).usingConnection(db).then(function (product) {
                return product;
              }).catch(function (err) {
                return proceed(new Error("Incoveniente al obtener el producto"));
                //return null;
              });
              //Actualizo los devices
              var epcs = Epcs.update(_.map(productos_zona, 'epcs_id'), {state: 1}).usingConnection(db).fetch().then(function (devices) {
                if(devices)
                  return devices;
                else
                  return [];
              }).catch(function (err) {
                return proceed(new Error("Incoveniente al crear los registros de dispositivos"));
                //return null;
              });

              Promise.all([
                product,
                epcs
              ]).then(function (values) {
                if(values){
                  return proceed(null,{
                    productos: values[0],
                    epcs: values[1]
                  });
                }else {
                  return proceed(new Error("Resultados invalidos"));
                }

              }).catch(function (err) {
                return proceed(new Error(err.message));
              });
            }

          });






        }).then(function (operation) {
        return res.json(operation);

      }).catch(function (error) {
        return res.serverError(error.message);
      });
    }

};
