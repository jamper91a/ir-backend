module.exports = {


  friendlyName: 'Create epc',


  description: 'Create several epc in the system',


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

      return sails.helpers.epc.findEpcByCodeAndEmployee(epc, this.req.employee.company.id);
    } catch (e) {
      return e;
    }

  }


};
