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
      data.company = sails.helpers.format.formatCompany(data.company);
    }
    return data;

  }


};

