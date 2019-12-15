/**
 * Companias
 *
 * @description :: Server-side logic for managing Companias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  getAllDealers: async function(req,res){
    let dealers, things;
    try {


      dealers = await  Dealers.find().populate('user');
      if(dealers) {
        if(req.body.justActiveDealers) {
          dealers = dealers.filter((dealer)=> { return dealer.user.active});
        }

        things = {code: '', data: dealers, error: null, propio: false, bd: false};
      } else
        things = {code: 'error_G06', data: [], error:true};

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },
  getAllActiveDealers: async function(req,res){
    let dealers, things;
    try {
        dealers = await  Dealers.find().populate('user',{active: true});
      if(dealers)
        things = {code: '', data: dealers, error: null, propio: false, bd: false};
      else
        things = {code: 'error_G06', data: [], error:true};

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },
  create: function (req, res) {
    try {
      req.body.user = JSON.parse(req.body.user);
      req.body.dealer = JSON.parse(req.body.dealer);
    } catch (error) {

    }

    try {
      if (!req.body.user.username || !req.body.user.password || !req.body.dealer.name) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);

      }
    } catch (e) {
      sails.log.error(e);
    }
    //Creo usuario
    req.body.user.active = 1;
    req.body.user.group = 5;
    Users.create(req.body.user).fetch().then(function (user) {
      req.body.dealer.user = user.id;
      Dealers.create(req.body.dealer).fetch().then(function (dealer) {
        let things={code: 'OK', req:req, res:res, data:dealer, error:null};
        return res.generalAnswer(things);
      }).catch(function (err) {
        let things={code: err.code, req:req, res:res, data:[], error:err, model:"Dealer"};
        return res.generalAnswer(things);
      })
    })
      .catch(function (err) {
        let things={code: err.code, req:req, res:res, data:[], error:err, model:"Users"};
        return res.generalAnswer(things);
      });
  },
  update: async function (req, res) {
    try {
      req.body.user = JSON.parse(req.body.user);
      req.body.dealer = JSON.parse(req.body.dealer);
    } catch (error) {

    }

    try {
      if (!req.body.user.username) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);

      }
    } catch (e) {
      sails.log.error(e);
    }
    //Find the user
    try {
      const user = await Users.updateOne({username: req.body.user.username}, req.body.user);
      await Dealers.updateOne({user: user.id}, req.body.dealer);
      let things = {code: 'OK', req: req, res: res, data: {}, error: null};
      return res.generalAnswer(things);
    } catch (e) {
      let things={code: err.code, req:req, res:res, data:[], error:err, model:"Dealers"};
      return res.generalAnswer(things);
    }
  },


};
