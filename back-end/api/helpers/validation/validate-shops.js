module.exports = {


  friendlyName: 'Validate shops',


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
      const valid =_.isObject(aux) &&
        _.isNumber(aux.id) && aux.id>0 &&
        _.isString(aux.name) &&
        _.isObject(aux.company) && _.isNumber(aux.company.id);
      if(!valid) {
        console.log('Shop not valid');
        console.log(aux);
      }
      return valid;
    });
  }


};

