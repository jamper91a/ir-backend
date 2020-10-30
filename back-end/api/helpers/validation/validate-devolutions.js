module.exports = {


  friendlyName: 'Validate devolutions',


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
        _.isString(aux.name) &&
        _.isNumber(aux.type);

      if(!valid) {
        console.log('Devolution not valid');
        console.log(aux);
      }
      return valid;

    });
  }


};

