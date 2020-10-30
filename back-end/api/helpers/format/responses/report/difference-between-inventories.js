module.exports = {


    friendlyName: 'Format answer',


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
    if(data) {
      data = await _.map(data, function (productHasZone) {
        return sails.helpers.format.formatProductHasZone(productHasZone);
      });
    }
    return data;
  }


};

