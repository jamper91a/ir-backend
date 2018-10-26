/**
 * ProductosZona
 *
 * @description :: Server-side logic for managing ProductosZona
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const name="Productos Zona";
module.exports = {

    addMercancia:function (req, res) {
      //Validate data
      if(!req.body.productos_zona || !req.body.productos_id){
        var things={
          code: 'error_G01',
          req:req,
          res:res,
          data:[],
          error:null
        };
          return res.generalAnswer(things);
      }

      var productos_zona = JSON.parse(req.body.productos_zona);

      sails.getDatastore()
        .transaction(async (db,proceed)=>{

          async.each(productos_zona, function (producto_zona, cb) {
            ProductosZona.create(producto_zona).usingConnection(db).fetch().then(function (aux) {
              cb();
            }).catch(function (err) {
              var things={code: 'error_PZ01', req:req, res:res, data:[], error:err};
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
                var things={code: 'error_P01', req:req, res:res, data:[], error:err};
                return proceed(null,things);
              });
              //Actualizo los devices
              var epcs = Epcs.update(_.map(productos_zona, 'epcs_id'), {state: 1}).usingConnection(db).fetch().then(function (devices) {
                if(devices)
                  return devices;
                else
                  return [];
              }).catch(function (err) {
                var things={code: 'error_EPC02', req:req, res:res, data:[], error:err};
                return proceed(null,things);
              });

              Promise.all([
                product,
                epcs
              ]).then(function (values) {
                if(values){
                  var things={code: '', req:req, res:res, data:values[1], error:null};
                  return proceed(null,things);
                }else {
                  var things={code: 'error_G05', req:req, res:res, data:[], error:null};
                  return proceed(null, things);
                }

              }).catch(function (err) {
                var things={code: '', req:req, res:res, data:[], error:err};
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
