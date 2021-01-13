module.exports = {


  friendlyName: 'Get dealer by id',


  description: '',


  inputs: {
    id: {
      type: 'number'
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'By id',
    },
    noDealer: {
      description: 'Dealer no found'
    }

  },


  fn: async function ({id}) {

    const SQL_DEALER= `
      SELECT dealers.id ,
             dealers.name ,
             dealers.createdAt ,
             dealers.updatedAt ,
             ${sails.config.custom.dbName}.groups.id as 'group.id',
             users.id as 'user.id',
             users.name as 'user.name',
             users.username as 'user.username',
             users.active as 'user.active'
      FROM dealers,
           users,
           ${sails.config.custom.dbName}.groups
      WHERE users.id = $1 and
        users.id = dealers.user_id and
        ${sails.config.custom.dbName}.groups.id = users.group_id;
     `;

    let dealer = await sails.sendNativeQuery(SQL_DEALER, [ id, sails.config.custom.dbName]);
    if(dealer && dealer.rows && dealer.rows[0]) {
      dealer = dealer.rows[0];
      return sails.helpers.util.nested(dealer);
    } else {
      throw 'noDealer';
    }

  }


};

