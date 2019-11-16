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
    let company, things;
    try {
      company = await Companies.findOne({id: req.body.id}).populate('user');
      things = {code: '', data: company, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },
};
