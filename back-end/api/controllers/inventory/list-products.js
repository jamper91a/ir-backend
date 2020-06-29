module.exports = {


  friendlyName: 'List products',


  description: 'List products based on inventory id',


  inputs: {
    inventory: {
      type: 'json',
      required: true
    }
  },


  exits: {

  },


  fn: async function ({inventory}) {

    let theInventory;
      try {
        theInventory = await Inventories.findOne({id: inventory})
          .populate('products.product');
        return {data:theInventory};



      } catch (e) {
        throw e;
      }

  }


};
