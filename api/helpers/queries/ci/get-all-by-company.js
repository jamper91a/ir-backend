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
      SELECT consolidated_inventories.id,
             consolidated_inventories.name,
             consolidated_inventories.total_products,
             consolidated_inventories.createdAt,
             consolidated_inventories.updatedAt,
             consolidated_inventories.employee_id as 'employee.id'
      FROM consolidated_inventories,
           employees
      WHERE employees.company_id = $1
        and employees.id = consolidated_inventories.employee_id
        and consolidated_inventories.id > 1`;

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

