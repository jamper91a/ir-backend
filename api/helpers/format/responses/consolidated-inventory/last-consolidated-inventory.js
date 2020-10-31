module.exports = {


  friendlyName: 'Format the response',


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


  fn: async function ({data}) {
    data.employee = sails.helpers.format.formatEmployee(data.employee);
    if(data.inventories) {
      data.inventories = _.map(data.inventories, function (inventory) {
        return sails.helpers.format.formatInventory(inventory);
      });
    }

    return data;
  }


};

