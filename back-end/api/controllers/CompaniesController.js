/**
 * Companias
 *
 * @description :: Server-side logic for managing Companias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  getCompaniesByDealer: async function(req,res){
    let dealer, things;
    try {
      if (typeof req.body.justActive === "string"){
        req.body.justActive = (req.body.justActive === 'true') ? true: false;
      }
      dealer = await  Dealers.findOne({user: req.user.id})
        .populate('user')
        .populate('companies.user');
      if(dealer) {
        if(req.body.justActive) {
          dealer.companies = dealer.companies.filter((company)=> { return company.user.active});
        }

        things = {code: '', data: dealer, error: null, propio: false, bd: false};
      } else
        things = {code: 'error_G06', data: [], error:true};

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },
  getCompaniesById: async function(req,res){
    let company, things, companyId;
    try {
      if(req.body.id){
        company = await Companies.findOne({id: req.body.id}).populate('user');
      }else{
        company = await Companies.findOne({user: req.employee.user.id}).populate('user');
      }

      things = {code: '', data: company, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

  update : async function(req, res){
    let things;
    const company = await Companies.findOne({user: req.employee.user.id});
    try {
      if(req.body.withPhoto === 'true'){
        const url_photo = await sails.helpers.uploadFile(req, company, 'logo');
        if (url_photo) {
          req.body.photo = url_photo;
        }
      }
        try {
          await Companies.updateOne({user: req.employee.user.id}, req.body);
          things = {code: '', data: {}, error: null, propio: false, bd: false};
          return res.generalAnswer(things);
        } catch (e) {
          things = {code: e.number, data: [], error: e, propio: e.propio, bd: e.bd};
          return res.generalAnswer(things);
        }

    } catch (e) {
      sails.log.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  },
};
