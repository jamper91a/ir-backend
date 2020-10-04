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
      data.zone = sails.helpers.format.formatZone(data.zone);
      data.consolidatedInventory = sails.helpers.format.formatConsolidatedInventory(data.consolidatedInventory);
      if(data.products) {
        data.products = _.map(data.products, function (product) {
          return sails.helpers.format.formatInventoriesHasProduct(product);
        });
      }
      if(data.employees) {
        data.employees = _.map(data.employees, function (employee) {
          return sails.helpers.format.formatEmployee(employee);
        });
      }
    }


    return data;

  }


};

