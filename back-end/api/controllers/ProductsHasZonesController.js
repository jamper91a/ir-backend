/**
 * ProductosZona
 *
 * @description :: Server-side logic for managing ProductosZona
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    addCommodity:function (req, res) {
      //Validate data
      if(!req.body.products || !req.body.product){
        let things={code: 'error_G01', req:req, res:res, data:[], error:new Error("error_G01")};
        return res.generalAnswer(things);
      }

      let newProducts=null;
      try {
        newProducts = JSON.parse(req.body.products);
      } catch (e) {
        newProducts = req.body.products;
      }
      // let products = req.body.products;

      sails.getDatastore()
        .transaction(async (db,proceed)=>{

          async.each(newProducts,
            async function (product, cb) {
            //Busco el epc id de ese epc
            try {
              let epc = await Epcs.find({ where: {epc: product.epc}}).limit(1).usingConnection(db);
              if(epc){
                epc= epc[0];
                product.epc=epc.id;
                try {
                  await ProductsHasZones.create(product).usingConnection(db);
                  cb();
                } catch (err) {
                  let things={code: err.number, req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
                  cb(things);
                }
              }else{
                let things={code: 'error_G01', req:req, res:res, data:[], error:new Error("Epc no valid: "+ product.epc)};
                cb(things);
              }
            } catch (e) {
              let things={code: '', req:req, res:res, data:[], error:e};
              cb(things);
            }

          },
            async function (error) {
            //Por alguna extrana razon la variable req.body.products se modifica
              let product, epcs;
            if(error)
            {
              return proceed(null,error);
            }else{
              try {
                product = await Products.find({id: req.body.product}).limit(1).usingConnection(db);
              } catch (err) {
                let things={code: 'error_P01', req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
                return proceed(null,things);
              }
              // let product = Products.find({
              //     id: req.body.product
              // }).limit(1).usingConnection(db).then(function (product) {
              //   return product;
              // }).catch(function (err) {
              //   let things={code: 'error_P01', req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
              //   return proceed(null,things);
              // });
              //Actualizo los devices
              try {
                epcs = Epcs.update(_.map(newProducts, 'epc_id'), {state: 1}).usingConnection(db).fetch();
              } catch (err) {
                let things={code: 'error_EPC02', req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
                return proceed(null,things);
              }

              // let epcs = Epcs.update(_.map(req.body.products, 'epc'), {state: 1}).usingConnection(db).fetch().then(function (devices) {
              //   if(devices)
              //     return devices;
              //   else
              //     return [];
              // }).catch(function (err) {
              //   let things={code: 'error_EPC02', req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
              //   return proceed(null,things);
              // });

              Promise.all([
                product,
                epcs
              ]).then(function (values) {
                if(values){
                  let data={
                    product: values[0][0],
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
        let shops = await Shops.find({
          where: {company: req.employee.company.id},
          select: ['id']
        });
        shops = shops.map(l => l.id);
        //Find all zones of the company of the empleado
        let zones = await Zones.find({
          where: {
            shop: shops
          },
          select: ['id']
        });
        zones = zones.map(z => z.id);
        //Find productos where productoid and zone match
        let products = await ProductsHasZones.find({
          where: {
            product: req.body.product,
            zone: zones
          }
        })
          .populate('product')
          .populate('zone')
          .populate('epc');

        let things = {code: '', data: products, error: null, propio: false, bd: false};
        return res.generalAnswer(things);
      } catch (e) {
        let things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
        return res.generalAnswer(things);
      }

    }
};
