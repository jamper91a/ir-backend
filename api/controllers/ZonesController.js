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
  find: async function(req, res){
    let things;

    try {
      const zones = await Zones.find({shop: req.body.id});
      things = {code: '', data: zones, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (e) {
      sails.log.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  }

};
