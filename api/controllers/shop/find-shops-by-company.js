module.exports = {


  friendlyName: 'Find shop',


  description: '',


  inputs: {

  },


  exits: {
    notAllow: {
      description: 'User no allow',
      responseType: 'forbidden'
    }
  },


  fn: async function () {
    if (sails.helpers.policies.canBeAnyOfThese(
      [
        sails.config.custom.USERS_GROUP.admin,
        sails.config.custom.USERS_GROUP.Cashier,
        sails.config.custom.USERS_GROUP.warehouse,
      ],
      this.req.user.group)
    ) {
      var company;
      if(this.req.user.group === sails.config.custom.USERS_GROUP.admin) {
        company = await Companies.findOne({user: this.req.employee.user.id});
      } else {
        company = await Companies.findOne({id: this.req.employee.company.id});
      }
      try {
        const shops = await Shops.find({company: company.id});
        return {data: shops};
      } catch (e) {
        sails.helpers.printError({title: 'findShops', message: e.message}, this.req);
        throw e;
      }
    } else {
      throw 'notAllow';
    }


  }


};
