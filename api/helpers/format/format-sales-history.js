module.exports = {


  friendlyName: 'Format product has zone',


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
      data.product = sails.helpers.format.formatProduct(data.product);
      data.productHasZone = sails.helpers.format.formatProductHasZone(data.productHasZone);
      data.user = sails.helpers.format.formatUser(data.user);
    }


    return data;

  }


};

