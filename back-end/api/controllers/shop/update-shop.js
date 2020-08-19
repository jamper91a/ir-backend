module.exports = {


  friendlyName: 'Update shop',


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
    shopNoValid: {
      description: 'Shop no valid to update',
      responseType: 'forbidden'
    }
  },


  fn: async function ({id, name}) {

    try {
      //Checkl if user can update this shop
      const shop = await Shops.findOne(id);
      if(shop && shop.company === this.req.employee.company.id) {
        await Shops.updateOne({id}).set({name});
        return {};
      } else {
        throw 'shopNoValid'
      }

    } catch (e) {
      await sails.helpers.printError({title: 'updateShop', message: e.message}, this.req);
      throw e;
    }

  }


};
