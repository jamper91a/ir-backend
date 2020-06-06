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
    const products = inputs.products;
    await  sails.getDatastore()
      .transaction(async (db) => {
        //Update every productZone
        for(const product of products) {
          try {
            //Save data for logs
            let newDevolutionHistory = {
              user: employee.user.id,
              product: product.product,
              productsHasZone: product.id
            };
            await DevolutionsHistory.create(newDevolutionHistory).usingConnection(db);
            await ProductsHasZones
              .update({ epc: product.epc })
              .set({ id: product.id, devolution: product.devolution, notes_return:product.notes_return })
              .usingConnection(db);
          } catch (err) {
            throw err;
          }
        }
        return {};
      });

  }


};
