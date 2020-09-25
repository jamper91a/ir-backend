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
  },


  fn: async function ({epc}) {
    try {
      return sails.helpers.productHasZone.findByEpcCodeAndEmployee(epc, this.req.employee.company.id);
    } catch (e) {
      return e;
    }

  }


};
