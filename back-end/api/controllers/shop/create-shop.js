module.exports = {


  friendlyName: 'Create shop',


  description: '',


  inputs: {
    shop: {
      type: 'json',
      required: true,
      custom: function (shop) {
        return  _.isObject(shop) &&
          _.isString(shop.name);


      }
    }
  },


  exits: {

  },


  fn: async function ({shop}) {

    let things;
    const company = await Companies.findOne({user: this.req.employee.user.id});
    try {
      this.req.body.company = company.id;
      await Shops.create(shop);
      return {}
    } catch (e) {
      await sails.helpers.printError({title: 'createShop', message: e.message}, this.req);
      return e;
    }
  }


};
