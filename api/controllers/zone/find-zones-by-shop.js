module.exports = {


  friendlyName: 'Find shop by id',


  description: 'It is used in the front-end by the admin',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({id}) {
    try {
      const zones = await Zones.find({shop: id});
      return { data: zones};
    } catch (e) {
      sails.helpers.printError({title: 'findZonesByShop', message: e.message}, this.req, e);
      throw e;
    }

  }


};
