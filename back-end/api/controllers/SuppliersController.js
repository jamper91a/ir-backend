/**
 * Proveedores
 *
 * @description :: Server-side logic for managing Proveedores
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  create : async function(req, res){
    let things;
    const company = await Companies.findOne({user: req.user.id});
    req.body.company = company.id;
    try {
      await Suppliers.create(req.body);
      things = {code: '', data: {}, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (e) {
      things = {code: e.number, data: [], error: e, propio: e.propio, bd: e.bd};
      return res.generalAnswer(things);
    }

  },
  find : async function(req, res){
    let things;
    const company = await Companies.findOne({user: req.user.id});
    try {
      const suppliers = await Suppliers.find({company: company.id});
      things = {code: '', data: suppliers, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (e) {
      things = {code: e.number, data: [], error: e, propio: e.propio, bd: e.bd};
      return res.generalAnswer(things);
    }

  },
};
