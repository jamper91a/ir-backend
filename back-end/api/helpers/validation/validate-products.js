module.exports = {


  friendlyName: 'Validate products',


  description: '',


  inputs: {
      products: {
        type: 'json',
        required: true
      }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({products}) {
    return _.every(products, function (product) {
      const valid = _.isObject(product) &&
        _.isNumber(product.id) && product.id>0 &&
        _.isString(product.ean) &&
        (_.isString(product.plu) || _.isEmpty(product.plu)) &&
        (_.isString(product.plu2) || _.isEmpty(product.plu)) &&
        (_.isString(product.plu3) || _.isEmpty(product.plu)) &&
        (_.isString(product.branch) || _.isEmpty(product.plu)) &&
        (_.isString(product.gender) || _.isEmpty(product.plu)) &&
        (_.isString(product.color) || _.isEmpty(product.plu)) &&
        (_.isString(product.size) || _.isEmpty(product.plu)) &&
        (_.isString(product.category) || _.isEmpty(product.plu)) &&
        (_.isString(product.description) || _.isEmpty(product.plu)) &&
        _.isNumber(product.amount) &&
        (_.isString(product.imagen) || product.imagen === null ) &&
        _.isNumber(product.cost_price) &&
        _.isNumber(product.sell_price) &&
        _.isObject(product.company) && _.isNumber(product.company.id) &&
        _.isObject(product.supplier) && _.isNumber(product.supplier.id);

      if(!valid) {
        console.log('Product not valid');
        console.log(_.isNumber(product.id) && product.id>0)
        console.log(_.isString(product.ean))
        console.log(_.isString(product.plu) || _.isEmpty(product.plu))
        console.log(_.isString(product.plu2) || _.isEmpty(product.plu))
        console.log(_.isString(product.plu3) || _.isEmpty(product.plu))
        console.log(_.isString(product.branch) || _.isEmpty(product.plu))
        console.log(_.isString(product.gender) || _.isEmpty(product.plu))
        console.log(_.isString(product.color) || _.isEmpty(product.plu))
        console.log(_.isString(product.size) || _.isEmpty(product.plu))
        console.log(_.isString(product.category) || _.isEmpty(product.plu))
        console.log(_.isString(product.description) || _.isEmpty(product.plu))
        console.log(_.isNumber(product.amount))
        console.log(_.isString(product.imagen) || product.imagen === null )
        console.log(_.isNumber(product.cost_price))
        console.log(_.isNumber(product.sell_price))
        console.log(_.isObject(product.company) && _.isNumber(product.company.id))
        console.log(_.isObject(product.supplier) && _.isNumber(product.supplier.id))
        console.log(product);
      }
      return valid;

    });
  }


};

