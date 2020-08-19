module.exports = {


  friendlyName: 'Change employee state',


  description: '',


  inputs: {
    username: {
      type: 'string',
      required: true
    },
    active: {
      type: 'boolean',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({username, active}) {

    try {
      await Users.updateOne({username},{active});
      return {};
    } catch (e) {
      await sails.helpers.printError({title: 'changeEmployeeState', message: e.message}, this.req, e);
      throw e;
    }

  }


};
