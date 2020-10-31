/**
 * Zonas
 *
 * @description :: Server-side logic for managing Zonas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  create: async function(req,res){
    let products, shop, things;
    if (!req.body.products) {
      things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
      return res.generalAnswer(things);
    }

    shop = req.employee.shop.id;
    try {
      products = JSON.parse(req.body.products);
    } catch (e) {
      products = req.body.products;
    }

    try {
      await InventoryErp.create({shop: shop, products: products});
      things = {code: '', data: [], error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

};
