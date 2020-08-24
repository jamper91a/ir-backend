module.exports = {


  friendlyName: 'Find product',

  description: 'Find all the products of a company. It is used by the front-end by the admin',

  inputs: {},
  exits: {
    noProductsFound: {
      description: 'No products found',
      responseType: 'badRequest'
    },
    companyNotFound: {
      description: 'Company not found',
      responseType: 'badRequest'
    },
  },


  fn: async function () {

    let products;
    try {
      const company = this.req.employee.company;
      if (company) {
        products = await Products.find({where: {company: company.id}});
        if (products && products.length > 0) {
          return {data: products};
        } else {
          throw 'noProductsFound';
        }
      } else {
        throw 'companyNotFound';
      }
    } catch (e) {
      sails.helpers.printError({title: 'find-products', message: e.message}, this.req, e);
      throw e;
    }

  }


};
