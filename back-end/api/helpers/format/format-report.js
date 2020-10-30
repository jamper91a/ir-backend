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
      data.employee = sails.helpers.format.formatEmployee(data.employee);
      data.firstInventory = sails.helpers.format.formatConsolidatedInventory(data.firstInventory);
      data.secondInventory = sails.helpers.format.formatConsolidatedInventory(data.secondInventory);
      if(data.products) {
        data.products = _.map(data.products, function (product) {
          return sails.helpers.format.formatReportHasProductsZone(product);
        });
      }
    }


    return data;

  }


};

