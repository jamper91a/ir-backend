module.exports = {


  friendlyName: 'Homologate units',


  description: 'This action will homologate units that do not appear in the reports',


  inputs: {
    products: {
      type: 'json',
      required: true,
      custom: function (products){
        const isArray = _.isArray(products);
        const allObjects = _.every(products, function (product) {
          return _.isNumber(product.id) && product.id>0

        });
        return isArray && allObjects;
      }
    }
  },


  exits: {

  },


  fn: async function ({products}) {

    try {
      let homologator_employee_id;
      homologator_employee_id = this.req.employee.id;
      await ReportsHasProductsZones.update(_.map(products, 'id'), {homologatorEmployee: homologator_employee_id});
      return {}
    } catch (e) {
      sails.helpers.printError({title: 'homologateUnits', message: e.message}, this.req, this.req.employee);
      throw e;
    }

  }


};
