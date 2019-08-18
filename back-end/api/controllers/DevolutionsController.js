/**
 * Devoluciones
 *
 * @description :: Server-side logic for managing Devoluciones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  returnProducts: function (req, res) {
    let products = JSON.parse(req.body.products);
    sails.getDatastore()
      .transaction(async (db, proceed) => {
        //actualizacion de cada producto zona
        let prd, things;
        products.forEach(async element => {
          try {
            prd = await ProductsHasZones.update({ epc: element.epc }).set({ devolution: element.devolution, notes_return:element.notes_return }).fetch();
          } catch (err) {
            things = { code: err.number, data: [], error: err, propio: err.propio, bd: err.bd };
            return proceed(things);
          }
        });
        things = {
          code: 'Correcto', data: {
          }, error: null, propio: false, bd: false
        };
        return proceed(null, things);
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
