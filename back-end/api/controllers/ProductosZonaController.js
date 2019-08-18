/**
 * ProductosZona
 *
 * @description :: Server-side logic for managing ProductosZona
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    addMercancia:function (req, res) {
      //Validate data
      if(!req.body.productos_zona || !req.body.product){
        let things={code: 'error_G01', req:req, res:res, data:[], error:new Error("error_G01")};
        return res.generalAnswer(things);
      }

      let productos_zona = JSON.parse(req.body.productos_zona);

      sails.getDatastore()
        .transaction(async (db,proceed)=>{

          async.each(productos_zona,
            async function (producto_zona, cb) {
            //Busco el epc id de ese epc
            try {
              let aux = await Epcs.findOne({epc: producto_zona.epc});
              if(aux){
                producto_zona.epc=aux.id;
                ProductsHasZones.create(producto_zona).usingConnection(db).fetch().then(function () {
                  cb();
                }).catch(function (err) {
                  let things={code: err.number, req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
                  cb(things);
                });
              }else{
                let things={code: 'error_G01', req:req, res:res, data:[], error:new Error("Epc no valid: "+ producto_zona.epc)};
                cb(things);
              }
            } catch (e) {
              let things={code: '', req:req, res:res, data:[], error:e};
              cb(things);
            }

          },
            function (error) {
            if(error)
            {
              return proceed(null,error);
            }else{
              let product = Products.find({
                  id: req.body.product
              }).limit(1).usingConnection(db).then(function (product) {
                return product;
              }).catch(function (err) {
                let things={code: 'error_P01', req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
                return proceed(null,things);
              });
              //Actualizo los devices
              let epcs = Epcs.update(_.map(productos_zona, 'epc'), {state: 1}).usingConnection(db).fetch().then(function (devices) {
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
                    producto: values[0][0],
                    epcs: values[1]
                  };
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
    },

    findProductInLocalByEanPlu: async function(req,res){
      try {
        if (!req.body.product) {
          let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
          return res.generalAnswer(things);
        }

        //Find all locals from the company of the empleado
        let locales = await Locales.find({
          where: {company: req.employee.company.id},
          select: ['id']
        });
        locales = locales.map(l => l.id);
        //Find all zones of the company of the empleado
        let zonas = await Zonas.find({
          where: {
            locales_id: locales
          },
          select: ['id']
        });
        zonas = zonas.map(z => z.id);
        //Find productos where productoid and zonas match
        let productos = await ProductsHasZones.find({
          where: {
            productos_id: req.body.product,
            zonas_id: zonas
          }
        })
          .populate('productos_id')
          .populate('zonas_id')
          .populate('epc');

        let things = {code: '', data: productos, error: null, propio: false, bd: false};
        return res.generalAnswer(things);
      } catch (e) {
        let things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
        return res.generalAnswer(things);
      }

    }
};
