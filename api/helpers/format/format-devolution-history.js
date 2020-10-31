module.exports = {


  friendlyName: 'Format dealer',


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
      } {
        data.product = sails.helpers.format.formatProduct(data.product);
        data.productsHasZone = sails.helpers.format.formatProductHasZone(data.productsHasZone);
        data.user = sails.helpers.format.formatUser(data.user);
      }
      return data;
    } {
      return null;
    }



  }


};

