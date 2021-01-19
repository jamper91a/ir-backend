
module.exports = {


  friendlyName: 'Validate products from consolidated inventory',


  description: '',


  inputs: {
      body: {
        type: 'ref',
        required: true
      }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    listProductsFormatNoValid: {
      description: 'Format no valid',
    },
    listProductsCiFormatNoValid: {
      description: 'Format no valid',
    },
    listProductsProductsFormatNoValid: {
      description: 'Format no valid',
    },

  },


  fn: async function ({body}) {
    const dateFormatToValid = "YYYY-MM-DDTHH:mm:ss";
    const consolidatedInventory = body.data.consolidatedInventories;
    const products = body.data.products;
    if(_.isObject(consolidatedInventory) &&
      _.isArray(products))
    {
      const allProducts = _.every(products, function (product) {
          const productDescription = product.product;
          const zone = product.zone;
          const devolution = product.devolution;
          const sell = product.sell;
          const epc = product.epc;

          const productValid = _.isObject(product) &&
            _.isNumber(product.id) && product.id>0 &&
            (sails.helpers.util.validateDate(product.admission_date, dateFormatToValid) || _.isNull(product.admission_date)) &&
            (sails.helpers.util.validateDate(product.transfer_date, dateFormatToValid) || _.isNull(product.transfer_date)) &&
            (sails.helpers.util.validateDate(product.sell_date, dateFormatToValid) || _.isNull(product.sell_date)) &&
            (_.isString(product.notes_return) || _.isNull(product.notes_return)) &&
            _.isBoolean(product.wasTransfered);
          const productDescriptionValid = _.isObject(productDescription) &&
            _.isNumber(productDescription.id) && productDescription.id>0 &&
            (_.isString(productDescription.ean) || _.isNull(productDescription.ean)) &&
            (_.isString(productDescription.plu) || _.isNull(productDescription.plu)) &&
            (_.isString(productDescription.branch) || _.isNull(productDescription.branch)) &&
            (_.isString(productDescription.gender) || _.isNull(productDescription.gender)) &&
            (_.isString(productDescription.color) || _.isNull(productDescription.color)) &&
            (_.isString(productDescription.size) || _.isNull(productDescription.size)) &&
            (_.isString(productDescription.category) || _.isNull(productDescription.category)) &&
            (_.isString(productDescription.description) || _.isNull(productDescription.description)) &&
            _.isNumber(productDescription.amount) &&
            (_.isString(productDescription.imagen) || _.isNull(productDescription.imagen)) &&
            _.isNumber(productDescription.cost_price) &&
            _.isNumber(productDescription.sell_price) &&
            _.isObject(productDescription.company) && productDescription.company.id > 0 &&
            _.isObject(productDescription.supplier) && productDescription.supplier.id > 0;

          const zoneValid = _.isObject(zone) &&
            _.isNumber(zone.id) && zone.id>0 &&
            _.isString(zone.name) &&
            _.isObject(zone.shop) && zone.shop.id > 0;

          const devolutionValid = _.isObject(devolution) && _.isNumber(devolution.id);
          const sellValid = (_.isObject(sell) && _.isNumber(sell.id)) || (sell == null);
          const epcValid = _.isObject(epc) &&
            _.isNumber(epc.id) &&
            _.isNumber(epc.state) &&
            _.isString(epc.epc) &&
            _.isObject(epc.company) && _.isNumber(epc.company.id) &&
            _.isObject(epc.dealer) && _.isNumber(epc.dealer.id);

          if(!productValid) {
            console.log('VLP: Product not valid');
            console.log(product);
            return false;
          }
          if(!productDescriptionValid) {
            console.log('VLP: productDescriptionValid not valid');
            console.log(productDescriptionValid);
            return false;
          }
          if(!productDescriptionValid) {
            console.log('VLP: productDescriptionValid not valid');
            console.log(productDescriptionValid);
            return false;
          }
          if(!zoneValid) {
            console.log('VLP: zoneValid not valid');
            console.log(zoneValid);
            return false;
          }
          if(!devolutionValid) {
            console.log('VLP: devolutionValid not valid');
            console.log(devolutionValid);
            return false;
          }
          if(!sellValid) {
            console.log('VLP: sellValid not valid');
            console.log(devolutionValid);
            return false;
          }
          if(!epcValid) {
            console.log('VLP: epcValid not valid');
            console.log(epcValid);
            return false;
          }
          return true;
      });
      if(!allProducts)
        throw 'listProductsProductsFormatNoValid';

      const ciValid =  _.isObject(consolidatedInventory) &&
        _.isNumber(consolidatedInventory.id) && consolidatedInventory.id>0 &&
        sails.helpers.util.validateDate(consolidatedInventory.createdAt, dateFormatToValid) &&
        _.isString(consolidatedInventory.name);
        _.isNumber(consolidatedInventory.total_product);
        _.isObject(consolidatedInventory.employee) &&
          _.isNumber(consolidatedInventory.employee.id) && consolidatedInventory.employee.id>0

      if(!ciValid){
        console.log('VLP: inventoryValid no valid');
        console.log(consolidatedInventory);
        throw 'listProductsCiFormatNoValid';
      }

      return true;

    } else{
      throw 'listProductsFormatNoValid'
    }

  }


};

