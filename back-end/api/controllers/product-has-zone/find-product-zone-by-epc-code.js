module.exports = {


  friendlyName: 'Create epc',


  description: 'Find a product zone and details using the epc code and the employee.' +
    'It is used in the mobile app by the sockets',


  inputs: {
    epc: {
      type: 'string',
      required: true
    }
  },


  exits: {
    epcNotFound: {
      description: 'Epc not found',
      responseType: 'badRequest'
    },
  },


  fn: async function ({epc}) {
    try {
      console.log('Searching: '+epc);
      return await sails.helpers.productHasZone.findByEpcCodeAndEmployee(epc, this.req.employee.company.id);
    } catch (e) {
      console.log('Epc not found: ' + epc);
      return e;
    }
  }


};
