module.exports = {


  friendlyName: 'Tags by dealer monthly',


  description: 'Get the amount of tags every dealer create by month ',


  exits: {

  },


  fn: async function () {
    let epcs;
    const dealer = await Dealers.findOne({user: this.req.user.id});
    const sql =`
    SELECT COUNT(1) AS amount, DAY(createdAt) AS day, MONTHNAME(createdAt) AS month
    FROM epcs
    WHERE dealer_id = $1
    GROUP BY MONTHNAME(createdAt), DAY(createdAt), MONTH(createdAt)
    ORDER BY MONTH(createdAt), DAY(createdAt);
    `;

    try {
      epcs = await sails.sendNativeQuery(sql, [dealer.id]);
      return {data:epcs.rows};
    } catch (e) {
      await sails.helpers.printError({title: 'noTagsByDealerMonthly', message: e.message}, this.req);
      throw e;
    }

  }


};
