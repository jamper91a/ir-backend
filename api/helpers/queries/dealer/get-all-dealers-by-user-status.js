module.exports = {



  description: 'Get all active dealers',


  inputs: {
    active: {
      type: 'boolean',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'By id',
    },
    noDealers: {
      description: 'Dealer no found'
    }

  },


  fn: async function ({active}) {

    let SQL_DEALER= `
      SELECT dealers.id,
             dealers.name,
             dealers.createdAt,
             users.id as 'user.id',
             users.name as 'user.name',
             users.username as 'user.username',
             users.active as 'user.active',
             users.group_id as 'user.group.id',
             users.createdAt as 'user.createdAt'
      FROM dealers
             LEFT JOIN users ON dealers.user_id = users.id
      WHERE users.active = $1
     `;

    let dealers = await sails.sendNativeQuery(SQL_DEALER, [active ? 1 : 0]);
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

