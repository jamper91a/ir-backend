module.exports = {


  friendlyName: 'Format dealer',


  description: '',


  inputs: {
    data: {
      type: 'json'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,

  fn: function ({data}) {

    if(data) {
      if( _.isNumber(data)) {
        data = { id: data}
      } else {
        data.user = sails.helpers.format.formatUser(data.user);
        if(data.companies) {
          data.companies = _.map(data.companies, function (company) {
            return sails.helpers.format.formatCompany(company);
          });
        }
      }
      return data;
    } {
      return null;
    }



  }


};

