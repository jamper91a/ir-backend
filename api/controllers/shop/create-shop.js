module.exports = {


  friendlyName: 'Create shop',


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

    let things;
    const company = await Companies.findOne({user: this.req.employee.user.id});
    try {
      inputs.company = company.id;
      await Shops.create(inputs);
      return {}
    } catch (e) {
      sails.helpers.printError({title: 'createShop', message: e.message}, this.req);
      throw e;
    }
  }


};
