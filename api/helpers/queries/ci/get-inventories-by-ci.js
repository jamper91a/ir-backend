module.exports = {



  description: 'Get inventories belong to a consolidated inventory',


  inputs: {
    consolidatedInventoryId:{
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Employees by admin',
    },

  },


  fn: async function ({consolidatedInventoryId}) {

    let SQL_DEALER= `
      SELECT
        id,
        createdAt,
        updatedAt,
        date,
        parcial,
        collaborative,
        message,
        zone_id as 'zone.id',
        consolidated_inventory_id as 'consolidatedInventory.id'
      FROM
        inventories
      WHERE
        consolidated_inventory_id = $1`;

    let inventories = await sails.sendNativeQuery(SQL_DEALER, [consolidatedInventoryId]);
    if(inventories && inventories.rows){
      inventories = inventories.rows
      inventories = _.map(inventories, function(inventory){
        return sails.helpers.util.nested(inventory);
      });
      return inventories;
    }

  }


};

