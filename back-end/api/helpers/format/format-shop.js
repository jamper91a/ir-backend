module.exports = {


  friendlyName: 'Format shop',


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
      if(data.employee) {
        data.employee = _.map(data.employee, function (employee) {
          return sails.helpers.format.formatEmployee(employee);
        });
      }
      if(data.zone) {
        data.zone = _.map(data.zone, function (zone) {
          return sails.helpers.format.formatZone(zone);
        });
      }
    }
    return data;



  }


};

