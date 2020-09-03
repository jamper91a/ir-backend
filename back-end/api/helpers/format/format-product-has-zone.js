module.exports = {


  friendlyName: 'Format product has zone',


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
      data.product = sails.helpers.format.formatProduct(data.product);
      data.zone = sails.helpers.format.formatZone(data.zone);
      data.devolution = sails.helpers.format.formatDevolution(data.devolution);
      data.sell = sails.helpers.format.formatSell(data.sell);
      data.epc = sails.helpers.format.formatEpc(data.epc);
      if(data.inventories) {
        data.inventories = _.map(data.inventories, function (inventory) {
          return sails.helpers.format.formatInventoryHasProduct(inventory);
        });
      }
    }


    return data;

  }


};

