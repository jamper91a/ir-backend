module.exports = {


  friendlyName: 'Products in inventory',


  description: '',


  inputs: {
    consolidateInventory: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({consolidateInventory}) {
    //Find all inventories of the first consolidated inventory
    let inventories = await Inventories.find({
      where: {consolidatedInventory: consolidateInventory}
    })
      .populate('products.zone&epc&product');
    //Add the products of the first inventory to an var
    let productsInInventory= [];
    for(const inventory  of inventories)
      productsInInventory = productsInInventory.concat(inventory.products);

    return productsInInventory;
  }


};

