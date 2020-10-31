module.exports = {


  friendlyName: 'Create inventory erp',


  description: 'Create an inventory ERP on the system, so admins can compare. It is used on the web by the admins',


  inputs: {
    products: {
      type: 'json',
      required: true,
      custom: function(products) {
        const isArray = _.isArray(products);
        const allObjects = _.every(products, function (product) {
          return _.isString(product.ean) &&
            _.isNumber(product.total)

        });
        return isArray && allObjects;
      }
    }
  },


  exits: {

  },


  fn: async function ({products}) {

    let shop = this.req.employee.shop.id;
    try {
      await InventoryErp.create({shop: shop, products: products});
      return {};
    } catch (e) {
      sails.helpers.printError({title: 'createInventoryErp', message: e.message}, this.req, e);
      throw e;
    }

  }


};
