/**
 * ProductosZona
 *
 * @description :: Server-side logic for managing ProductosZona
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    addMercancia:function (req, res) {
      //Validate data
      if(!req.body.productos_zona || !req.body.productos_id){
        let things={code: 'error_G01', req:req, res:res, data:[], error:null};
        return res.generalAnswer(things);
      }

      let productos_zona = JSON.parse(req.body.productos_zona);

      sails.getDatastore()
        .transaction(async (db,proceed)=>{

          async.each(productos_zona, function (producto_zona, cb) {
            ProductosZona.create(producto_zona).usingConnection(db).fetch().then(function () {
              cb();
            }).catch(function (err) {
              let things={code: err.number, req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
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
                let things={code: 'error_P01', req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
                return proceed(null,things);
              });
              //Actualizo los devices
              let epcs = Epcs.update(_.map(productos_zona, 'epcs_id'), {state: 1}).usingConnection(db).fetch().then(function (devices) {
                if(devices)
                  return devices;
                else
                  return [];
              }).catch(function (err) {
                let things={code: 'error_EPC02', req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
                return proceed(null,things);
              });

              Promise.all([
                product,
                epcs
              ]).then(function (values) {
                if(values){
                  let data={
                    producto: values[0],
                    epcs: values[1]
                  }
                  let things={code: '', req:req, res:res, data:data, error:null};
                  return proceed(null,things);
                }else {
                  let things={code: 'error_G05', req:req, res:res, data:[], error:err, propio:true, bd:false};
                  return proceed(null, things);
                }

              }).catch(function (err) {
                let things={code: '', req:req, res:res, data:[], error:err, propio:false, bd:false};
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
