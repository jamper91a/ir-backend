module.exports = {


  friendlyName: 'Format company',


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
        data.employee = sails.helpers.format.formatEmployee(data.employee);
        if(data.inventories) {
          data.inventories = _.map(data.inventories, function (inventory) {
            return sails.helpers.format.formatConsolidatedInventorey(inventory);
          });
        }
      }
      return data;
    } {
      return null;
    }



  }


};

