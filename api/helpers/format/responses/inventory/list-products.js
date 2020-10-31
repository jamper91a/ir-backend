module.exports = {


  friendlyName: 'List products',


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
    data.zone = sails.helpers.format.formatZone(data.zone);
    data.consolidatedInventory = sails.helpers.format.formatConsolidatedInventory(data.consolidatedInventory);
    if(data.products) {
      data.products = await _.map(data.products, function (productHasZone) {
        return sails.helpers.format.formatProductHasZone(productHasZone);
      });
    }

    return data;
  }


};

