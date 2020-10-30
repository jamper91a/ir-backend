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
      data.report = sails.helpers.format.formatReport(data.report);
      data.product = sails.helpers.format.formatProductHasZone(data.product);
      data.homologatorEmployee = sails.helpers.format.formatEmployee(data.homologatorEmployee);
    }


    return data;

  }


};

