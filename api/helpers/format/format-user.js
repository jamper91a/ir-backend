module.exports = {


  friendlyName: 'Format dealer',


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
      data.group = sails.helpers.format.formatGroup(data.group);
      if(data.employee) {
        data.employee = _.map(data.employee, function (employee) {
          return sails.helpers.format.formatEmployee(employee);
        });
      }
      if(data.dealer) {
        data.dealer = _.map(data.employee, function (dealer) {
          return sails.helpers.format.formatDealer(dealer);
        });
      }
    }
    return data;



  }


};

