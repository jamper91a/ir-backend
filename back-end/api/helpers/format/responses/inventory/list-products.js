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
    data = sails.helpers.format.formatRelation(data, 'zone');
    data = sails.helpers.format.formatRelation(data, 'consolidatedInventory');
    if(data.products) {
      data.products = await _.map(data.products, function (productHasZone) {
        return sails.helpers.format.formatProductHasZone(productHasZone);
      });
    }

    return data;
  }


};

