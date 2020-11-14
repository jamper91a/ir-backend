module.exports = {


  friendlyName: 'Sale units',


  description: '',


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
    notAllow: {
      description: 'User no allow',
      responseType: 'forbidden'
    },
    productsNotFound: {
      description: 'Products were not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({firstInventory, secondInventory}) {
    if(sails.helpers.policies.canBeAnyOfThese(
      [
        sails.config.custom.USERS_GROUP.admin,
        sails.config.custom.USERS_GROUP.Cashier,
        sails.config.custom.USERS_GROUP.warehouse,
      ],
      this.req.user.group)
    ) {
      try {
        //Find all inventories of the first consolidated inventory
        let productsFirstInventory = await sails.helpers.product.productsInConsolidatedInventory(firstInventory);
        let productsSecondInventory = await sails.helpers.product.productsInConsolidatedInventory(secondInventory);

        //In case first inventory does not have data, I will switch to the second to be able to fill the no found products
        if(productsFirstInventory.length === 0 && productsSecondInventory.length > 0) {
          productsFirstInventory = productsSecondInventory;
          //I know one of them is empty
          productsSecondInventory  = [] ;
        } else if (productsFirstInventory.length === 0 && productsSecondInventory.length === 0) {
          throw 'productsNotFound';
        }

        let saleUnits = [];
        let returnedUnits = [];

        await async.forEach(productsFirstInventory,
          async function (product, cb) {
              if(product.sell>1){
                if(!sails.helpers.existInArray(saleUnits, product))
                  saleUnits.push(product);
                cb();
              }else if(product.devolution>1){
                if(!sails.helpers.existInArray(returnedUnits, product))
                  returnedUnits.push(product);
                cb();
              }
          },
          async function(e){
            if(e){
              sails.helpers.printError({title: 'sale-units'},this.req, e);
              throw e;
            }

          }
        );
        //Search for the products of the secons inventory in the first inventory
        await async.forEach(productsSecondInventory,
          async function (product, cb) {
          console.log(product.id);
            let found = productsFirstInventory.find(product => product.id === product.id);
            //If the product was not found I will check if it was sold or transfer
            if(!found){
              if(product.sell>1){
                if(!sails.helpers.existInArray(saleUnits, product))
                  saleUnits.push(product);
                cb();
              }else if(product.devolution>1){
                if(!sails.helpers.existInArray(returnedUnits, product))
                  returnedUnits.push(product);
                cb();
              }
            }else{
              cb();
            }
          },
          async function(e){
            if(e){
              sails.helpers.printError({title: 'sale-units'},this.req, e);
              throw e;
            }

          }
        );

        const data = {
          saleUnits: saleUnits,
          returnedUnits: returnedUnits
        };
        return {data};
      } catch (e) {
        sails.helpers.printError({title: 'saleUnits', message: e.message}, this.req, this.req.employee);
        throw e;
      }
    } else {
      throw 'notAllow';
    }


  }


};
