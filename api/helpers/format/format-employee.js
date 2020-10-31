module.exports = {


  friendlyName: 'Format employee',


  description: '',


  inputs: {
    data: {
      type: 'json',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,

  fn: function ({data}) {

    if( _.isNumber(data)) {
      data = { id: data}
    } else {
      data.company = sails.helpers.format.formatCompany(data.company);
      data.user = sails.helpers.format.formatUser(data.user);
      data.shop = sails.helpers.format.formatShop(data.shop);
      if(data.inventories) {
        data.inventories = _.map(data.inventories, function (inventory) {
          return sails.helpers.format.formatInventory(inventory);
        });
      }
    }
    return data;



  }


};

