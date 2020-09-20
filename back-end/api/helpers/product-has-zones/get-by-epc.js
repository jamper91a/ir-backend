module.exports = {


  friendlyName: 'Get by epc',


  description: 'Find a product zone by the epc. It is used in the' +
    'mobile app',


  inputs: {
    epc: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'By epc',
    },

  },


  fn: async function ({epc}) {

    //Find the epc
    const epcFound = await sails.helpers.epc.findByEpc(epc)

  }


};

