/**
 * Locales
 *
 * @description :: Server-side logic for managing Locales
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  create: async function (req, res) {
    let things;
    const company = await Companies.findOne({user: req.user.id});
    try {
      req.body.company = company.id;
      await Shops.create(req.body);
      things = {code: '', data: {}, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (e) {
      console.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  }
};
