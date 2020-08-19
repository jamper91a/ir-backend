module.exports = {


  friendlyName: 'Create zone',


  description: 'It is use by admin from the front-end',


  inputs: {
    name: {
      type: 'string',
      required: true
    },
    shop: {
      type: 'number',
      required: true,
      custom: function (shop){
        return shop > 0;
      }
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    try {
      await Zones.create(inputs);
    } catch (e) {
      await sails.helpers.printError({title: 'createZone', message: e.message}, this.req);
      return e;
    }

  }


};
