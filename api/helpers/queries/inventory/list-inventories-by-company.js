module.exports = {



  description: 'List all inventories by the company and filter by collaborative and type',


  inputs: {
    companyId:{
      type: 'number',
      required: true
    },
    type: {
      type: 'string',
      required: true,
      isIn: ['all', 'consolidado', 'no_consolidado'],
      description: `
            Si es consolidado, busque aquellos con consolidatedInventory mayor a 1,
            Si es no_consolidado busque aquellos con consolidatedInventory igual 1
            Si es all busque todos`

    },
    collaborative: {
      type: 'boolean',
      required: true,
      description: 'Determia si se listan parciales o colaborativos'
    }
  },


  exits: {
  },


  fn: async function ({companyId, type, collaborative}) {

    let SQL= `
        SELECT
              DISTINCT (inventories.id),
              DATE_FORMAT(inventories.date, ${sails.config.custom.dateFormat}) AS 'date',
              inventories.parcial,
              inventories.collaborative,
              inventories.message,
              DATE_FORMAT(inventories.createdAt, ${sails.config.custom.dateFormat}) AS 'createdAt',
              DATE_FORMAT(inventories.updatedAt, ${sails.config.custom.dateFormat}) AS 'updatedAt',
              zones.id as 'zone.id',
              zones.name as 'zone.name',
              DATE_FORMAT(zones.createdAt, ${sails.config.custom.dateFormat}) AS 'zone.createdAt',
              DATE_FORMAT(zones.updatedAt, ${sails.config.custom.dateFormat}) AS 'zone.updatedAt',
              shops.id as 'zone.shop.id',
              shops.name as 'zone.shop.name',
              DATE_FORMAT(shops.createdAt, ${sails.config.custom.dateFormat}) AS 'zone.shop.createdAt',
              DATE_FORMAT(shops.updatedAt, ${sails.config.custom.dateFormat}) AS 'zone.shop.updatedAt',
              shops.company_id as 'zone.shop.company.id',
              inventories.consolidated_inventory_id as 'consolidatedInventory.id'
       FROM
              employees_inventories
              LEFT JOIN inventories ON employees_inventories.inventory_id = inventories.id
              LEFT JOIN zones ON inventories.zone_id = zones.id
              LEFT JOIN shops ON zones.shop_id = shops.id
       WHERE
          employees_inventories.employee_id IN (SELECT id FROM employees WHERE company_id = $1)
          and inventories.collaborative = $2
      `;

    switch (type) {
      case 'all':
        SQL = SQL + 'and inventories.consolidated_inventory_id >= 1';
        break;
      case 'consolidado':
        SQL = SQL + 'and inventories.consolidated_inventory_id > 1';
        break;
      case 'no_consolidado':
        SQL = SQL + 'and inventories.consolidated_inventory_id = 1';
        break;
    }

    let inventories = await sails.sendNativeQuery(SQL, [companyId, collaborative]);
    if(inventories && inventories.rows){
      inventories = inventories.rows
      inventories = _.map(inventories, function(inventory){
        return sails.helpers.util.nested(inventory);
      });
      return inventories;
    }

  }


};

