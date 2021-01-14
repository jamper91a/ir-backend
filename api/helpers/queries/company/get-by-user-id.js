module.exports = {


  friendlyName: 'Get a company by userId',


  description: '',


  inputs: {
    userId: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'By id',
    },
  },


  fn: async function ({userId}) {

    let SQL_DEALER= `
      SELECT companies.id,
             companies.name,
             companies.photo,
             companies.dealer_id as 'dealer.id',
             users.id as 'user.id',
             users.name as 'user.name',
             users.username as 'user.username',
             users.active as 'user.active',
             users.group_id as 'user.group.id'
      FROM users,
           companies
      WHERE companies.user_id = $1
        and companies.user_id = users.id
     `;

    let company = await sails.sendNativeQuery(SQL_DEALER, [userId]);
    if(company && company.rows && company.rows[0]) {
      company = company.rows[0];
      return sails.helpers.util.nested(company);
    } else {
      return null;
    }

  }


};

