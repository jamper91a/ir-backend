module.exports = {


  friendlyName: 'Validate inventories',


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
      return  _.isObject(aux) &&
        _.isNumber(product.id) && product.id>0 &&
        _.isDate(aux.date) &&
        _.isNumber(aux.parcial) &&
        _.isNumber(aux.collaborative) &&
        _.isString(aux.message) &&
        _.isObject(aux.zone) && _.isNumber(aux.zone.id) &&
        _.isObject(aux.consolidatedInventory) && _.isNumber(aux.consolidatedInventory.id);


    });
  }


};

