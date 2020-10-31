module.exports = {


  friendlyName: 'Format company',


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
        data.dealer = sails.helpers.format.formatDealer(data.dealer);
        data.user = sails.helpers.format.formatUser(data.user);

        if(data.employees) {
          data.employees = _.map(data.employees, function (employee) {
            return sails.helpers.format.formatEmployee(employee);
          });
        }
        if(data.ecps) {
          data.ecps = _.map(data.ecps, function (epc) {
            return sails.helpers.format.formatEpc(epc);
          });
        }
        if(data.products) {
          data.products = _.map(data.products, function (product) {
            return sails.helpers.format.formatProduct(product);
          });
        }
        if(data.shops) {
          data.shops = _.map(data.shops, function (shop) {
            return sails.helpers.format.formatShop(shop);
          });
        }
      }
      return data;



  }


};

