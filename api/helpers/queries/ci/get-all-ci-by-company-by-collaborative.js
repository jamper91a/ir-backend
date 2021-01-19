module.exports = {



  description: 'Get all consolidated inventories by company filter by collaborative status',


  inputs: {
    companyId:{
      type: 'number',
      required: true
    },
    collaborative: {
      type: 'number',
      required: true
    }
  },


  exits: {
  },


  fn: async function ({companyId, collaborative}) {

    let SQL_DEALER= `
      SELECT inventories.id,
             consolidated_inventories.id,
             consolidated_inventories.name,
             consolidated_inventories.total_products,
             consolidated_inventories.createdAt,
             consolidated_inventories.updatedAt,
             consolidated_inventories.employee_id as 'employee.id',
             inventories.collaborative
      FROM consolidated_inventories
             LEFT OUTER JOIN inventories
                             ON consolidated_inventories.id = inventories.consolidated_inventory_id
             LEFT OUTER JOIN employees
                             ON consolidated_inventories.employee_id = employees.id
      WHERE inventories.collaborative = $1 and
            employees.company_id = $2
        and consolidated_inventories.id > 1
      GROUP BY inventories.consolidated_inventory_id`;

    let consolidateInventories = await sails.sendNativeQuery(SQL_DEALER, [collaborative, companyId]);
    if(consolidateInventories && consolidateInventories.rows){
      consolidateInventories = consolidateInventories.rows
      consolidateInventories = _.map(consolidateInventories, function(product){
        return sails.helpers.util.nested(product);
      });
      return consolidateInventories;
    }

  }


};

