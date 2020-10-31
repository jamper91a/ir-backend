module.exports = {


  friendlyName: 'Return products',


  description: 'Return products after they have been sold',


  inputs: {
    products: {
      type: 'json',
      required: true,
      custom: function(products) {
        const isArray = _.isArray(products);
        const allObjects = _.every(products, function (product) {
            return _.isNumber(product.id) &&
            _.isNumber(product.zone) &&
            _.isNumber(product.product) &&
            _.isNumber(product.epc) &&
              //Type of devolution
            _.isNumber(product.devolution) &&
            _.isString(product.notes_return)

          });
        return isArray && allObjects;
      }

    }
  },


  exits: {

  },


  fn: async function (inputs) {
    const employee = this.req.employee;
    let products = inputs.products;

    let newDevolutionHistories = [];
      return await sails.getDatastore()
        .transaction(async (db) => {
          //Update every productZone
          for (const product of products) {
            try {
              //Save data for logs
              let newDevolutionHistory = {
                user: employee.user.id,
                product: product.product,
                productsHasZone: product.id
              };
              newDevolutionHistories.push(newDevolutionHistory);
              await ProductsHasZones
                .update({epc: product.epc})
                .set({id: product.id, devolution: product.devolution, notes_return: product.notes_return})
                .usingConnection(db);
            } catch (err) {
              sails.helpers.printError({title: 'productsNoReturned', message: e.message}, this.req);
              throw err;
            }
          }
          //Create all the devolution history
          try {
            await DevolutionsHistory.createEach(newDevolutionHistories).usingConnection(db);
          } catch (e) {
            sails.helpers.printError({title: 'productsNoReturned', message: e.message}, this.req);
            throw e;
          }
          return {data:{}};
        });

  }


};
