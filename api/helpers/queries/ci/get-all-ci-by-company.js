module.exports = {



  description: 'Get all consolidated inventories by company',


  inputs: {
    companyId:{
      type: 'number',
      required: true
    }
  },


  exits: {
  },


  fn: async function ({companyId}) {

    let SQL_DEALER= `
      SELECT inventories.id,
             consolidated_inventories.id,
             consolidated_inventories.name,
             consolidated_inventories.total_products,
             DATE_FORMAT(consolidated_inventories.createdAt, ${sails.config.custom.dateFormat}) AS 'createdAt',
             DATE_FORMAT(consolidated_inventories.updatedAt, ${sails.config.custom.dateFormat}) AS 'updatedAt',
             consolidated_inventories.employee_id as 'employee.id',
             inventories.collaborative
      FROM consolidated_inventories
             LEFT OUTER JOIN inventories
                             ON consolidated_inventories.id = inventories.consolidated_inventory_id
             LEFT OUTER JOIN employees
                             ON consolidated_inventories.employee_id = employees.id
      WHERE employees.company_id = $1
        and consolidated_inventories.id > 1
      GROUP BY inventories.consolidated_inventory_id`;

    let consolidateInventories = await sails.sendNativeQuery(SQL_DEALER, [companyId]);
    if(consolidateInventories && consolidateInventories.rows){
      consolidateInventories = consolidateInventories.rows
      consolidateInventories = _.map(consolidateInventories, function(product){
        return sails.helpers.util.nested(product);
      });
      return consolidateInventories;
    }

  }


};

