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
    if(_.isNumber(data.product)) {
      data = sails.helpers.format.formatRelation(data, 'product');
    } else {
      data.product = sails.helpers.format.formatRelation(data.product, 'company');
      // if(_.isNumber(data.product.company)) {
      //   data.product.company= {
      //     id: data.product.company
      //   }
      // }
      data.product = sails.helpers.format.formatRelation(data.product, 'supplier');
      // if(_.isNumber(data.product.supplier)) {
      //   data.product.supplier= {
      //     id: data.product.supplier
      //   }
      // }
    }
    data = sails.helpers.format.formatRelation(data, 'zone');
    // if(data.zone && _.isNumber(data.zone)) {
    //   data.zone= {
    //     id: data.zone
    //   }
    // }
    data = sails.helpers.format.formatRelation(data, 'devolution');
    // if(data.devolution && _.isNumber(data.devolution)) {
    //   data.devolution= {
    //     id: data.devolution
    //   }
    // }
    data = sails.helpers.format.formatRelation(data, 'sell');
    // if(data.sell && _.isNumber(data.sell)) {
    //   data.sell= {
    //     id: data.sell
    //   }
    // }
    data = sails.helpers.format.formatRelation(data, 'epc');

    return data;

  }


};

