/**
 * Ventas
 *
 * @description :: Server-side logic for managing Ventas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  createSell: async function (req, res){
    //Validate data
    if(!req.body.sell || !req.body.products){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let products=req.body.products;
    let sell=req.body.sell;
    try {
      products = JSON.parse(req.body.products);
      sell = JSON.parse(req.body.sell);
    } catch (e) {

    }


    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        //Primero creo la venta
        sell.employee = req.employee.id;
        let newSell,productsFromTransfer, things;
        try {
          newSell = await Sells.create(sell).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        //Una vez creado la transferencia, le asocio los productos
        try {
          products.forEach(p => p.sell = {id: newSell.id});
          async.each(products,
            async function (product, cb) {
              try {
                await ProductsHasZones.updateOne({id: product.id}, {id: product.id, sell: newSell.id}).usingConnection(db);
                cb();
              } catch (err) {
                let things={code: err.number, req:req, res:res, data:[], error:err, propio:err.propio, bd:err.bd};
                cb(things);
              }

            },
            async function (error) {
              if(error)
              {
                return proceed(null,error);
              }else{
                let things={code: '', req:req, res:res, data:products, error:null};
                return proceed(null,things);
              }

            });
        } catch (err) {
          things = {code: err.message, error: err};
          return proceed(things);
        }
      })
      .then(function (operation) {
        return res.generalAnswer(operation);
      })
      .catch(function (error) {
        if(error.raw)
          error = error.raw;
        else{
          error.error = error;
        }
        return res.generalAnswer(error);
      });
  }

};
