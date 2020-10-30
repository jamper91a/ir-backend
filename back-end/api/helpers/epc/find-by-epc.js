module.exports = {


  friendlyName: 'Find by epc',


  description: 'Find an epc using the epc code',


  inputs: {
    epc: {
      type: 'string',
      required: true
    }
  },


  exits: {

    epcNotFound: {
      description: 'Epc no found'
    },

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({epc}) {
    var epcToFind = await  Epcs.findOne({epc: epc});
    if(epcToFind) {
      return epcToFind
    } else {
      throw 'epcNotFound'
    }
  }


};

