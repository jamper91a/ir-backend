module.exports = {


  friendlyName: 'Format inventory',


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
      data.shop = sails.helpers.format.formatShop(data.shop);
    }
    return data;



  }


};

