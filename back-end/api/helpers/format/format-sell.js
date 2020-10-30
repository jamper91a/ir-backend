module.exports = {


  friendlyName: 'Format shop',


  description: '',


  inputs: {
    data: {
      type: 'json',
      required: false
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
      }
      return data;
    } else{
      return null
    }




  }


};

