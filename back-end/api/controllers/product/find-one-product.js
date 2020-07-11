module.exports = {


  friendlyName: 'Find one product',


  description: 'Find one product by the ean/plu code. It is used in the app and the front-end',


  inputs: {
    code: {
      type: 'string',
      required: true
    }
  },


  exits: {
    productNotFound: {
      description: 'Product not found',
      responseType: 'badRequest'
    },
  },


  fn: async function ({code}) {

    let product;
    product = await  Products.findOne({
      where:{
        or:[
          {ean:  code},
          {plu:  code},
          {plu2: code},
          {plu3: code},

        ]
      }
    }).populate('company');
    if(product)
      return {data:product};
    else
      throw 'productNotFound';

  }


};
