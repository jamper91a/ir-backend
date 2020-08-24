module.exports = {


  friendlyName: 'Update zone',


  description: '',


  inputs: {
    id: {
      type: 'number',
      required: true,
      custom: function (id) {
        return id>0;
      }
    },
    name: {
      type: 'string',
      required: true,

    }
  },


  exits: {

  },


  fn: async function ({id, name}) {

    try {
      await Zones.updateOne({id}).set({name});
      return {};
    } catch (e) {
      sails.helpers.printError({title: 'updateZone', message: e.message}, this.req);
      return e;
    }

  }


};
