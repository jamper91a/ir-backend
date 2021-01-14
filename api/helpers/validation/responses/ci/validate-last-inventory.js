
module.exports = {


  friendlyName: 'Validate last inventory',


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
    lastInventoryFormatNoValid: {
      description: 'Format no valid',
    },
    inventoriesNoValid: {
      description: 'Format no valid',
    }

  },


  fn: async function ({body}) {
    const dateFormatToValid = "YYYY-MM-DDTHH:mm:ss";
    const inventories = body.data.inventories;
    if(_.isArray(inventories))
    {
      const allInventories = _.every(inventories, function (inventory) {
        const zone = inventory.zone;
        const ci = inventory.consolidatedInventory;
        const products = inventory.products;
        let allProducts = false;
        const zoneValid =  _.isObject(zone) &&
          _.isNumber(zone.id) && zone.id>0;
        const ciValid =  _.isObject(ci) &&
          _.isNumber(ci.id) && ci.id>0;

        if(_.isArray(products)){
          allProducts = _.every(products, function (product){
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
            const sellValid = _.isObject(sell) && _.isNumber(sell.id);
            const epcValid = _.isObject(epc) &&
              _.isNumber(epc.id) &&
              _.isNumber(epc.state) &&
              _.isString(epc.epc) &&
              _.isObject(epc.company) && _.isNumber(epc.company.id) &&
              _.isObject(epc.dealer) && _.isNumber(epc.dealer.id);

            if(!productValid) {
              console.log('VLI: Product not valid');
              console.log(product);
              return false;
            }
            if(!productDescriptionValid) {
              console.log('VLI: productDescriptionValid not valid');
              console.log(productDescriptionValid);
              return false;
            }
            if(!productDescriptionValid) {
              console.log('VLI: productDescriptionValid not valid');
              console.log(productDescriptionValid);
              return false;
            }
            if(!zoneValid) {
              console.log('VLI: zoneValid not valid');
              console.log(zoneValid);
              return false;
            }
            if(!devolutionValid) {
              console.log('VLI: devolutionValid not valid');
              console.log(devolutionValid);
              return false;
            }
            if(!sellValid) {
              console.log('VLI: sellValid not valid');
              console.log(devolutionValid);
              return false;
            }
            if(!epcValid) {
              console.log('VLI: epcValid not valid');
              console.log(epcValid);
              return false;
            }
            return true;
          });
        } else{
          console.log('VLI: products no valid');
          console.log(_.isArray(products));
          return false
        }

        const inventoryValid =  _.isObject(inventory) &&
          _.isNumber(inventory.id) && inventory.id>0 &&
          sails.helpers.util.validateDate(inventory.date, dateFormatToValid) &&
          _.isNumber(inventory.parcial) &&
          _.isNumber(inventory.collaborative) &&
          _.isString(inventory.message);

        if(!inventoryValid){
          console.log('VLI: inventoryValid no valid');
          console.log(inventoryValid);
          return false
        }
        if(!zoneValid){
          console.log('VLI: zoneValid no valid');
          console.log(zoneValid);
          return false;
        }
        if(!ciValid){
          console.log('VLI: ciValid no valid');
          console.log(ciValid);
          return false;
        }
        if(!allProducts){
          console.log('VLI: allProducts no valid');
          console.log(allProducts);
          return false;
        }


        return true;
      });
      if(!allInventories)
        throw 'inventoriesNoValid';

      return true;

    } else{
      throw 'lastInventoryFormatNoValid'
    }

  }


};

