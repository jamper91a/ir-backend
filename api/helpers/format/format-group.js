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
      }
      return data;



  }


};

