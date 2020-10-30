module.exports = {


  friendlyName: 'Format inventory',


  description: '',


  inputs: {
    object: {
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

  fn: function ({object}) {

    if( _.isNumber(object)) {
      object = { id: object}
    } else {
      object = sails.helpers.format.formatRelation(object, 'shop');
    }
    return object;
  }


};

