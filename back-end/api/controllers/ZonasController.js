/**
 * Zonas
 *
 * @description :: Server-side logic for managing Zonas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  listar: async function(req,res){
    let zonas, things;
    try {
      console.log(req.employee);
      zonas = await  Zonas.find({
        where:{locales_id: req.employee.locales_id.id}
      });
      things = {code: '', data: zonas, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

};
