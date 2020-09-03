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
      data.user = sails.helpers.format.formatUser(data.user);
    }
    return data;



  }


};

