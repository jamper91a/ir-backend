module.exports = {


  friendlyName: 'Validate epc',


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
      return _.isObject(aux) &&
        _.isNumber(aux.id) && aux.id>0 &&
        _.isString(aux.name) &&
        _.isObject(aux.shop) && _.isNumber(aux.shop.id);

    });
  }


};

