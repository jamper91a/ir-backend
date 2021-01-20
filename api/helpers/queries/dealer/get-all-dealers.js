module.exports = {



  description: 'Get all dealers',


  inputs: {
  },


  exits: {

    success: {
      outputFriendlyName: 'By id',
    },
    noDealers: {
      description: 'Dealer no found'
    }

  },


  fn: async function () {

    let SQL_DEALER= `
      SELECT dealers.id,
             dealers.name,
             DATE_FORMAT(dealers.createdAt, ${sails.config.custom.dateFormat}) as 'createdAt',
             users.id as 'user.id',
             users.name as 'user.name',
             users.username as 'user.username',
             users.active as 'user.active',
             users.group_id as 'user.group.id',
             DATE_FORMAT(users.createdAt, ${sails.config.custom.dateFormat}) as 'user.createdAt'
      FROM dealers
             LEFT JOIN users ON dealers.user_id = users.id
     `;

    let dealers = await sails.sendNativeQuery(SQL_DEALER, []);
    if(dealers && dealers.rows){
      dealers = dealers.rows
      dealers = _.map(dealers, function(dealer){
        dealer['user.active'] = Boolean(dealer['user.active']);
        return sails.helpers.util.nested(dealer);
      });
      return dealers;
    }

  }


};

