module.exports = {


  friendlyName: 'Get transfers by shop',


  description: '',


  inputs: {
    shop: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({shop}) {
    let transfers;

    try {
      transfers = await  Transfers.find({
        or: [
          {'shopSource': shop},
          {'shopDestination': shop}
        ]
      })
        .populate('products')
        .populate('shopSource')
        .populate('shopDestination');

      return {data: transfers};
    } catch (e) {
      sails.helpers.printError({title: 'getTransfersByShop', message: e.message}, this.req);
      throw e;
    }

  }


};
