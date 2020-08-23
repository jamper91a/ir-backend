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
      data.product= {
        id: data.product
      }
    } else {
      if(_.isNumber(data.product.company)) {
        data.product.company= {
          id: data.product.company
        }
      }
      if(_.isNumber(data.product.supplier)) {
        data.product.supplier= {
          id: data.product.supplier
        }
      }
    }

    if(data.zone && _.isNumber(data.zone)) {
      data.zone= {
        id: data.zone
      }
    }

    if(data.devolution && _.isNumber(data.devolution)) {
      data.devolution= {
        id: data.devolution
      }
    }

    if(data.sell && _.isNumber(data.sell)) {
      data.sell= {
        id: data.sell
      }
    }

    return data;

  }


};

