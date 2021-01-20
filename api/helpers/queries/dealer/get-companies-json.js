module.exports = {


  friendlyName: 'Get companies of an specific dealer using their userId',


  description: '',


  inputs: {
    userId: {
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


  fn: async function ({userId, justActive}) {

    let SQL_DEALER= `
      SELECT dealers.id ,
             dealers.name ,
             DATE_FORMAT(dealers.createdAt, ${sails.config.custom.dateFormat}) as 'createdAt',
             DATE_FORMAT(dealers.updatedAt, ${sails.config.custom.dateFormat}) as 'updatedAt',
             ${sails.config.custom.dbName}.groups.id as 'group.id',
             users.id as 'user.id',
             users.name as 'user.name',
             users.username as 'user.username',
             users.active as 'user.active',
             users.group_id as 'user.group.id',
             JSON_ARRAY(
               JSON_OBJECT(
                 'id', companies.id,
                 'name', companies.name,
                 'photo', companies.photo,
                 'dealer.id', companies.dealer_id,
                 'user.id', companies_user.id,
                 'user.name', companies_user.name,
                 'user.username', companies_user.username,
                 'user.active', companies_user.active,
                 'user.group.id', companies_user.group_id
                 )) AS companies
      FROM dealers
             LEFT JOIN users ON dealers.user_id = users.id
             LEFT JOIN ${sails.config.custom.dbName}.groups ON users.group_id = ${sails.config.custom.dbName}.groups.id
             LEFT JOIN companies ON dealers.id = companies.dealer_id
             LEFT JOIN users AS companies_user ON companies.user_id = companies_user.id
      WHERE users.id = $1
     `;
    if(justActive){
      SQL_DEALER = SQL_DEALER + ` and users.active = true;`;
    } else {
      SQL_DEALER = SQL_DEALER+ ';';
    }

    let dealer = await sails.sendNativeQuery(SQL_DEALER, [ userId]);
    if(dealer && dealer.rows){
      dealer = dealer.rows[0];
      dealer.companies = JSON.parse(dealer.companies);
      dealer.companies = _.map(dealer.companies, function(company){
        return sails.helpers.util.nested(company);
      });
      return sails.helpers.util.nested(dealer);
    }


  }


};

