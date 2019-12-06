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
    let pos = 0;
    for(let epc of epcs){
      epc.state = 0;
      epc.epc = epc.epc.replace(/[^A-Za-z0-9]/gi, '');
      if(!epc.epc){
        epcs.splice(pos, 1);
      }
      pos++;
    }
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
        sails.log.error(error.error);
        error = error.raw;
        return res.generalAnswer(error);
      });
  },
  tagsByDealerByMonth: async function(req,res){
    let epcs, things;
    const dealer = await Dealers.findOne({user: req.user.id});
    const sql =`
    SELECT COUNT(1) AS amount, DAY(createdAt) AS day, MONTHNAME(createdAt) AS month
    FROM epcs
    WHERE dealer_id = $1
    GROUP BY MONTHNAME(createdAt), DAY(createdAt), MONTH(createdAt)
    ORDER BY MONTH(createdAt), DAY(createdAt);
    `;

    try {
      epcs = await sails.sendNativeQuery(sql, [dealer.id]);
      things = {code: '', data: epcs.rows, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (e) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },
  tagsByCompanyByMonth: async function(req,res){
    let epcs, things;
    const dealer = await Dealers.findOne({user: req.user.id});
    const sql =`
    SELECT COUNT(1) AS amount, DAY(createdAt) AS day, MONTHNAME(createdAt) AS month
    FROM epcs
    WHERE dealer_id = $1 AND company_id=$2
    GROUP BY MONTHNAME(createdAt), DAY(createdAt), MONTH(createdAt)
    ORDER BY MONTH(createdAt), DAY(createdAt);
    `;

    try {
      epcs = await sails.sendNativeQuery(sql, [dealer.id, req.body.id]);
      things = {code: '', data: epcs.rows, error: null, propio: false, bd: false};
      return res.generalAnswer(things);
    } catch (e) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  }

};
