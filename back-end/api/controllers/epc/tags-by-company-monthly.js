module.exports = {


  friendlyName: 'Tags by company monthly',


  description: 'Web service to get the report of the amount of epcs that every company has used. It is used by the dealer' +
    'in the web page',


  inputs: {
    id: {
      type: 'number',
      description: 'Company\'s id',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({id}) {

    let epcs;
    const dealer = await Dealers.findOne({user: this.req.user.id});
    const sql =`
    SELECT COUNT(1) AS amount, DAY(createdAt) AS day, MONTHNAME(createdAt) AS month
    FROM epcs
    WHERE dealer_id = $1 AND company_id=$2
    GROUP BY MONTHNAME(createdAt), DAY(createdAt), MONTH(createdAt)
    ORDER BY MONTH(createdAt), DAY(createdAt);
    `;

    try {
      epcs = await sails.sendNativeQuery(sql, [dealer.id, id]);
      return {data:epcs.rows};
    } catch (e) {
      await sails.helpers.printError({title: 'noTagsByCompanyMonthly', message: e.message}, this.req);
      throw e;
    }

  }


};
