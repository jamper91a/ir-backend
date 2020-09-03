module.exports = {


  friendlyName: 'Format inventory',


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
      data.invetory = sails.helpers.format.formatInventory(data.invetory);
      data.epc = sails.helpers.format.formatEpc(data.epc);
      data.zone = sails.helpers.format.formatZone(data.zone);
      data.product = sails.helpers.format.formatProductsHasZone(data.product);
    }
    return data;



  }


};

