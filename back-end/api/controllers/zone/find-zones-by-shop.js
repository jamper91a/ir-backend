module.exports = {


  friendlyName: 'Find shop by id',


  description: '',


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
      await sails.helpers.printError({title: 'findZonesByShop', message: e.message}, this.req, e);
      throw e;
    }

  }


};
