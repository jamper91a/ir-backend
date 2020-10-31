module.exports = {


  friendlyName: 'Find by epc',


  description: 'Find an epc using the epc code',


  inputs: {
    epc: {
      type: 'string',
      required: true
    },
    company:{
      type: 'number',
      required: true,
      description: 'To validate the epc to find belogs to the company of the user'
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


  fn: async function ({epc, company}) {
    var epcToFind = await  Epcs.findOne({epc: epc, company: company});

    if(epcToFind) {
      return epcToFind
    } else {
      throw 'epcNotFound'
    }
  }


};

