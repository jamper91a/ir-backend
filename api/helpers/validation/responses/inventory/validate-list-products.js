
module.exports = {


  friendlyName: 'Validate products from inventory',


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
    listProductsZoneFormatNoValid: {
      description: 'Format no valid',
    },

  },


  fn: async function ({body}) {
    const dateFormatToValid = "YYYY-MM-DDTHH:mm:ss";
    const products = body.data.products;
    const inventory = body.data;
    const zone = body.data.zone;
    if(_.isObject(inventory) &&
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
            sails.helpers.util.validateDate(productDescription.createdAt, dateFormatToValid) &&
            sails.helpers.util.validateDate(productDescription.updatedAt, dateFormatToValid) &&
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

          let devolutionValid = _.isObject(devolution) || _.isNull(devolution);

          if(_.isObject(devolution)) {
            devolutionValid = _.isNumber(devolution.id) && devolution.id>0 &&
              _.isString(devolution.name) &&
              (devolution.id > 1 && _.isNumber(devolution.type)) || (devolution.id == 1 && _.isNull(devolution.type)) &&
              sails.helpers.util.validateDate(devolution.createdAt, dateFormatToValid) &&
              sails.helpers.util.validateDate(devolution.updatedAt, dateFormatToValid);
          }
          let sellValid = (_.isObject(sell) && _.isNumber(sell.id) || (_.isObject(sell) && _.isNull(sell.id)));

          if(_.isObject(sell) && !_.isNull(sell.id)) {
            sellValid = _.isNumber(sell.id) && sell.id>0 &&
              _.isObject(sell.user) && _.isNumber(sell.user.id) && sell.user.id > 0
              sails.helpers.util.validateDate(sell.createdAt, dateFormatToValid) &&
              sails.helpers.util.validateDate(sell.updatedAt, dateFormatToValid);
          }

          const epcValid = _.isObject(epc) &&
            _.isNumber(epc.id) &&
            _.isNumber(epc.state) &&
            _.isString(epc.epc) &&
            _.isObject(epc.company) && _.isNumber(epc.company.id) &&
            _.isObject(epc.dealer) && _.isNumber(epc.dealer.id) &&
            sails.helpers.util.validateDate(epc.createdAt, dateFormatToValid) &&
            sails.helpers.util.validateDate(epc.updatedAt, dateFormatToValid);

          if(!productValid) {
            console.log('IVLP: Product not valid');
            console.log(product);
            return false;
          }
          if(!productDescriptionValid) {
            console.log('IVLP: productDescriptionValid not valid');
            console.log(productDescription);
            return false;
          }
          if(!zoneValid) {
            console.log('IVLP: zoneValid not valid');
            console.log(zone);
            return false;
          }
          if(!devolutionValid) {
            console.log('IVLP: devolutionValid not valid');
            console.log(devolution);
            return false;
          }
          if(!sellValid) {
            console.log('IVLP: sellValid not valid');
            console.log(sell);
            return false;
          }
          if(!epcValid) {
            console.log('IVLP: epcValid not valid');
            console.log(epc);
            return false;
          }
          return true;
      });
      if(!allProducts)
        throw 'listProductsProductsFormatNoValid';

      const zoneIsValid = _.isObject(zone) &&
        _.isNumber(zone.id) && zone.id > 0 &&
        _.isString(zone.name) &&
        sails.helpers.util.validateDate(zone.createdAt, dateFormatToValid) &&
        sails.helpers.util.validateDate(zone.updatedAt, dateFormatToValid) &&
        _.isObject(zone.shop) && _.isNumber(zone.shop.id) && zone.shop.id > 0;

      if(!zoneIsValid){
        console.log('IVLP: zoneIsValid no valid');
        console.log(zoneIsValid);
        throw 'listProductsZoneFormatNoValid';
      }


      const inventoryValid =  _.isObject(inventory) &&
        _.isNumber(inventory.id) && inventory.id>0 &&
        sails.helpers.util.validateDate(inventory.createdAt, dateFormatToValid) &&
        sails.helpers.util.validateDate(inventory.updatedAt, dateFormatToValid) &&
        sails.helpers.util.validateDate(inventory.date, dateFormatToValid) &&
        _.isNumber(inventory.parcial) &&
        _.isNumber(inventory.collaborative) &&
        _.isString(inventory.message)

      if(!inventoryValid){
        console.log('IVLP: inventoryValid no valid');
        console.log(consolidatedInventory);
        throw 'listProductsCiFormatNoValid';
      }

      return true;

    } else{
      throw 'listProductsFormatNoValid'
    }

  }


};

