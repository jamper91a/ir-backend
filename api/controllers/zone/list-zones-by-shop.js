module.exports = {


  friendlyName: 'List zones',


  description: 'It is used in the mobile app',


  inputs: {

  },


  exits: {
    noZones: {
      description: 'No zones found',
      responseType: 'badRequest'
    }
  },


  fn: async function () {

    let zones;
    try {
      zones = await  Zones.find({
        where:{shop: this.req.employee.shop.id}
      });
      if(zones) {
        return {data: zones};
      } else {
        throw 'noZones';
      }

    } catch (e) {
      sails.helpers.printError({title: 'listZones', message: e.message}, this.req, e);
      throw e;
    }

  }


};
