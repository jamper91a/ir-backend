module.exports = {


  friendlyName: 'Validate products has zones',


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
    return _.every(data, function (aux) {
      const valid = _.isObject(aux) &&
        _.isNumber(aux.id) && aux.id>0 &&
        _.isObject(aux.product) && _.isNumber(aux.product.id) &&
        _.isObject(aux.zone) && _.isNumber(aux.zone.id) &&
        (aux.devolution != null ? (_.isObject(aux.devolution) && _.isNumber(aux.devolution.id)) : true) &&
        (aux.sell != null ? (_.isObject(aux.sell) && _.isNumber(aux.sell.id)) : true) &&
        _.isObject(aux.epc) && _.isNumber(aux.epc.id);

      if(!valid) {
        console.log('ProductZone not valid');
        console.log(aux);
      }
      return valid;
    });
  }


};

