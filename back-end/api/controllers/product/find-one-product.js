module.exports = {


  friendlyName: 'Find one product',


  description: 'Find one product by the ean/plu code. It is used in the app and the front-end',


  inputs: {
    code: {
      type: 'string',
      required: true
    },
    //This is just for test to check if not getting products of a different company
    companyId: {
      type: 'number',
      required: false,
      defaultsTo: 0
    }
  },


  exits: {
    productNotFound: {
      description: 'Product not found',
      responseType: 'badRequest'
    },
    companyNotFound: {
      description: 'Company not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({code, companyId}) {
    const company = this.req.employee.company;
    if(company) {
      //This is just for test to check if not getting products of a different company
      if(sails.config.custom.test && companyId === -1) {
        company.id = 0;
      }
      let product;
      product = await  Products.findOne({
        where:{
          or:[
            {ean:  code},
            {plu:  code},
            {plu2: code},
            {plu3: code},

          ],
          company: company.id
        }
      }).populate('company');
      if(product)
        return {data:product};
      else
        throw 'productNotFound';
    } else {
      throw 'companyNotFound';
    }


  }


};
