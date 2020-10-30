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
      data.employee = sails.helpers.format.formatEmployee(data.employee);
      data.shopSource = sails.helpers.format.formatShop(data.shopSource);
      data.shopDestination = sails.helpers.format.formatShop(data.shopDestination);
      if(data.products) {
        data.products = _.map(data.products, function (product) {
          return sails.helpers.format.formatTransferHasZonesProduct(product);
        });
      }
    }
    return data;

  }


};

