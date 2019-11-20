/**
 * Productos
 *
 * @description :: Server-side logic for managing Productos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  create : async function(req, res){
    let things;
    const company = await Companies.findOne({user: req.user.id});
    try {
      const url_photo = await sails.helpers.uploadFile(req, company, 'product');
      if (url_photo) {
        req.body.imagen = url_photo;
        req.body.company = company.id;
        req.body.supplier = 1;
        try {
          await Products.create(req.body);
          things = {code: '', data: {}, error: null, propio: false, bd: false};
          return res.generalAnswer(things);
        } catch (e) {
          things = {code: e.number, data: [], error: e, propio: e.propio, bd: e.bd};
          return res.generalAnswer(things);
        }
      }
    } catch (e) {
      console.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  },

  findOne: async function(req,res){
    let product, things;
    if(!req.body.code){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      product = await  Products.findOne({
        where:{
          or:[
            {ean: req.body.code},
            {plu: req.body.code},

          ]
        }
      }).populate('company');
      if(product)
        things = {code: '', data: product, error: null, propio: false, bd: false};
      else
        things = {code: 'error_G06', data: [], error:true};

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },
  findOneByEpc: async function(req,res){
    let product, things;
    if(!req.body.code){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      //Find the epc
      let epc = await Epcs.findOne({
        where:{
          epc: req.body.code
        }
      });

      if(epc){
        //Find productos where productoid and zone match
        let product = await ProductsHasZones.findOne({
          where: {
            epc: epc.id
          }
        })
          .populate('product')
          .populate('zone')
          .populate('epc');

        let things = {code: '', data: product.product, error: null, propio: false, bd: false};
        return res.generalAnswer(things);
      }else{
        let things = {code: 'error_E01', req: req, res: res, data: [], error: new Error("error_E01")};
        return res.generalAnswer(things);
      }

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },


};
