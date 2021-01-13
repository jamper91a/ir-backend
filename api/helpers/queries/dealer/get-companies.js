module.exports = {


  friendlyName: 'Get companies of an specific dealer',


  description: '',


  inputs: {
    dealerId: {
      type: 'number',
      required: true
    },
    justActive: {
      type: 'boolean',
      required: true,
      description: 'To know if the companies should be filter by user status'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Companies',
    },

  },


  fn: async function ({dealerId, justActive}) {

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
      WHERE companies.dealer_id = $1
        and companies.user_id = users.id
     `;
    if(justActive){
      SQL_DEALER = SQL_DEALER + ` and users.active = true;`;
    } else {
      SQL_DEALER = SQL_DEALER+ ';';
    }

    let companies = await sails.sendNativeQuery(SQL_DEALER, [ dealerId]);
    if(companies && companies.rows){
      companies = companies.rows
      companies = _.map(companies, function(company){
        return sails.helpers.util.nested(company);
      });
      return companies;
    }


  }


};

