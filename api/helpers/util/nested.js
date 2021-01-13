var unflatten = require('flat').unflatten
module.exports = {


  friendlyName: 'Nested object',


  description: 'It takes a flat object and returns a nested one',


  inputs: {
    data: {
      type: 'ref',
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
    const nested = unflatten(data);
    return nested;
  }


};

