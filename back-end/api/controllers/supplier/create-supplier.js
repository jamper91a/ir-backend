module.exports = {


  friendlyName: 'Create supplier',


  description: '',


  inputs: {
    name: {
      type: 'string',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    const company = await Companies.findOne({user: this.req.employee.user.id});
    inputs.company = company.id;
    try {
      await Suppliers.create(inputs);
      return {};
    } catch (e) {
      sails.helpers.printError({title: 'createSupplier', message: e.message}, this.req);
      throw e;
    }

  }


};
