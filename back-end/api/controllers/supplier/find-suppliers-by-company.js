module.exports = {


  friendlyName: 'Find suppliers by company id',


  description: '',


  inputs: {

  },


  exits: {
    notAllow: {
      description: 'User no allow',
      responseType: 'forbidden'
    }
  },


  fn: async function (inputs) {

    if (sails.helpers.policies.canBeAnyOfThese(
      [
        sails.config.custom.USERS_GROUP.admin,
        sails.config.custom.USERS_GROUP.Cashier,
        sails.config.custom.USERS_GROUP.warehouse,
      ],
      this.req.user.group)
    ) {
      const company = await Companies.findOne({user: this.req.employee.user.id});
      try {
        const suppliers = await Suppliers.find({company: company.id});
        return {data: suppliers};
      } catch (e) {
        await sails.helpers.printError({title: 'findSuppliers', message: e.message}, this.req);
        throw e;
      }
    } else {
      throw 'notAllow';
    }
  }


};
