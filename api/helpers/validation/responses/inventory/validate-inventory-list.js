module.exports = {


  friendlyName: 'Validate companies',


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
    inventoryListFormatNoValid: {
      description: 'Format no valid',
    },
    inventoryListInventoriesFormatNoValid: {
      description: 'Format no valid',
    },

  },


  fn: async function ({body}) {
    const dateFormatToValid = "YYYY-MM-DDTHH:mm:ss";
    const inventories = body.data;
    if(_.isArray(inventories))
    {
      const allInventoriesValid = _.every(inventories, function (inventory) {
        const zone = inventory.zone;
        const shop = inventory.zone.shop;
        const consolidatedInventory = inventory.consolidatedInventory;

        const zoneIsValid = _.isObject(zone) &&
          _.isNumber(zone.id) && zone.id > 0 &&
          _.isString(zone.name) &&
          sails.helpers.util.validateDate(zone.createdAt, dateFormatToValid) &&
          sails.helpers.util.validateDate(zone.updatedAt, dateFormatToValid) &&
          _.isObject(zone.shop);

        if(!zoneIsValid) {
          console.log('VIL: Zone no valid');
          console.log(zone);
          return  false;
        }

        const shopIsValid = _.isObject(shop) &&
          _.isNumber(shop.id) && zone.id > 0 &&
          _.isString(shop.name) &&
          sails.helpers.util.validateDate(shop.createdAt, dateFormatToValid) &&
          sails.helpers.util.validateDate(shop.updatedAt, dateFormatToValid) &&
          _.isObject(shop.company) && _.isNumber(shop.company.id);

        if(!shopIsValid) {
          console.log('VIL: Shop no valid');
          console.log(shop);
          return  false;
        }

        const consolidatedInventoryIsValid = _.isObject(consolidatedInventory) &&
          _.isNumber(consolidatedInventory.id) && consolidatedInventory.id > 0;

        if(!consolidatedInventoryIsValid) {
          console.log('VIL: consolidatedInventory no valid');
          console.log(consolidatedInventory);
          return  false;
        }
        const inventoryIsValid =
          _.isObject(inventory) &&
          _.isNumber(inventory.id) && inventory.id>0 &&
          sails.helpers.util.validateDate(inventory.date, dateFormatToValid) &&
          sails.helpers.util.validateDate(inventory.createdAt, dateFormatToValid) &&
          sails.helpers.util.validateDate(inventory.updatedAt, dateFormatToValid) &&
          _.isNumber(inventory.parcial) &&
          _.isNumber(inventory.collaborative) &&
          _.isString(inventory.message);

        if(!inventoryIsValid){
          console.log('VLI: inventoryIsValid');
          console.log(inventory);
          return false;
        }
        return true;
      });
      if(!allInventoriesValid){
        throw 'inventoryListInventoriesFormatNoValid';
      }

      return true;

    } else{
      throw 'inventoryListFormatNoValid'
    }

  }


};

