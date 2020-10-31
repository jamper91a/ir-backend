module.exports = {


  friendlyName: 'Format relation',


  description: 'It format an id of a relation to be an object',


  inputs: {
    object: {
      type: 'json',
      required: true
    },
    key: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,


  fn: function ({object, key}) {
    if(object[key] && _.isNumber(object[key])) {
      object[key]= { id: object[key]}
    }
    return object;
  }


};

