module.exports = {


  friendlyName: 'Find shop by company',


  description: 'It is used in the front-end by the admin',


  inputs: {
  },


  exits: {

  },


  fn: async function () {
    try {
      const company = this.req.employee.company;
      let shops = await Shops.find({where: {company: company.id}, select: ['id']});
      shops = shops.map(d => d.id);
      const zones = await Zones.find({shop: shops});
      return { data: zones};
    } catch (e) {
      sails.helpers.printError({title: 'findZonesByCompany', message: e.message}, this.req, e);
      throw e;
    }

  }


};
