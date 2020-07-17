module.exports = {


  friendlyName: 'Difference between inventories',


  description: 'This web service it would find the difference between to consolidate inventories. It would check how many' +
    'products were not found. A product is not found if is not in both inventories and it has not being sold or transferred',


  inputs: {
    firstInventory: {
      type: 'number',
      required: true
    },
    secondInventory: {
      type: 'number',
      required: true
    }
  },


  exits: {
    productsNotFound: {
      description: 'Products were not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({firstInventory, secondInventory}) {

    //Find all inventories of the first consolidated inventory
    let productsFirstInventory = await sails.helpers.product.productsInConsolidatedInventory(firstInventory);
    let productsSecondInventory = await sails.helpers.product.productsInConsolidatedInventory(secondInventory);
    let notFoundProducts = [];

    //In case first inventory does not have data, I will switch to the second to be able to fill the no found products
    if(productsFirstInventory.length === 0 && productsSecondInventory.length > 0) {
      productsFirstInventory = productsSecondInventory;
      //I know one of them is empty
      productsSecondInventory  = [] ;
    } else if (productsFirstInventory.length === 0 && productsSecondInventory.length === 0) {
      throw 'productsNotFound';
    }
    //Search for the products of the first inventory in the second inventory
    await async.forEach(productsFirstInventory,
      async function (firstProduct, cb) {
        let found = productsSecondInventory.find(product => product.id === firstProduct.id);
        //If the product was not found I will check if it was sold or transfer
        if(!found){
          if(firstProduct.sell<=1){
            if(!sails.helpers.existInArray(notFoundProducts, firstProduct))
              notFoundProducts.push(firstProduct);
            cb();
          }else{
            //Search for the product in the transfer table
            let transfer = await TransfersHasZonesProducts.find({where: {product: firstProduct.id}});
            if(!transfer){
              if(!sails.helpers.existInArray(notFoundProducts, firstProduct))
                notFoundProducts.push(firstProduct);
            }
            cb();
          }
        }else{
          cb();
        }
      },
      async function(e){
        if(e){
          await sails.helpers.printError({title: 'differenceBetweenInventories'},this.req, e);
          throw e;
        }
        return {data:notFoundProducts};
      }
    );

    return {data:notFoundProducts};

  }


};
