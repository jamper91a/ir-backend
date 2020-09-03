module.exports = {


  friendlyName: 'Format supplier',


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
      data.product = sails.helpers.format.formatProductHasZone(data.product);
      data.transfer = sails.helpers.format.formatTransfer(data.transfer);
    }
    return data;

  }


};

