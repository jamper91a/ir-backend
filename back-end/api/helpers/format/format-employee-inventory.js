module.exports = {


  friendlyName: 'Format employee',


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
        data.inventory = sails.helpers.format.formatInventory(data.inventory);
        data.employee = sails.helpers.format.formatEmployee(data.employee);
      }
      return data;



  }


};

