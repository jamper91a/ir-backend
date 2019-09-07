/**
 * Devoluciones
 *
 * @description :: Server-side logic for managing Devoluciones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  returnProducts: function (req, res) {
    let products = req.body.products;
    try {
      products = JSON.parse(req.body.products);
    } catch (e) {
    }
    sails.getDatastore()
      .transaction(async (db, proceed) => {
        //actualizacion de cada producto zona
        let prd, things;
        products.forEach(async element => {

        });

        async.each(products,
          async function (element, cb) {
            try {
              prd = await ProductsHasZones.update({ epc: element.epc }).set({ id: element.id, devolution: element.devolution, notes_return:element.notes_return }).fetch();
            } catch (err) {
              things = { code: err.number, data: [], error: err, propio: err.propio, bd: err.bd };
              return proceed(things);
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
      })
      .then(function (operation) {
        return res.generalAnswer(operation);
      })
      .catch(function (error) {
        error = error.raw;
        return res.generalAnswer(error);
      });

  },
};
