/**
 * Epcs
 *
 * @description :: Server-side logic for managing Epcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  create: async function(req,res){
    let epcs, things;
    epcs = req.body.epcs;
    // for(const epc of epcs){
    //   epc.state = 0;
    // }
    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        try {
          await Epcs.createEach(epcs).usingConnection(db);
          let things = {code: 'OK', req: req, res: res, data: {}, error: null};
          return proceed(null, things);
        } catch (e) {
          let things = {code: '', req: req, res: res, data: {}, error: e};
          return proceed(things);
        }
      })
      .then(function (operation) {
        return res.generalAnswer(operation);
      })
      .catch(function (error) {
        console.error(error.error);
        error = error.raw;
        return res.generalAnswer(error);
      });
  },

};
