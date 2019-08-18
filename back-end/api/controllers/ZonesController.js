/**
 * Zonas
 *
 * @description :: Server-side logic for managing Zonas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  list: async function(req,res){
    let zones, things;
    try {
      zones = await  Zones.find({
        where:{shop: req.employee.shop.id}
      });
      things = {code: '', data: zones, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

};
