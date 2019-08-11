/**
 * Devoluciones
 *
 * @description :: Server-side logic for managing Devoluciones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  devolverProductos: function (req, res) {
    productos_zona = JSON.parse(req.body.productos_zona);
    console.log(productos_zona);
    sails.getDatastore()
      .transaction(async (db, proceed) => {
        //actualizacion de cada producto zona
        let prd, things;
        productos_zona.forEach(async element => {
          try {
            prd = await ProductosZona.update({ epcs_id: element.epcs_id }).set({ devoluciones_id: element.devoluciones_id, devolucion_observaciones:element.devolucion_observaciones }).fetch();
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
