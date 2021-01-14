module.exports = {


  friendlyName: 'Get employees by admin',


  description: '',


  inputs: {
    companyId:{
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Employees by admin',
    },

  },


  fn: async function ({companyId}) {

    let SQL_DEALER= `
      SELECT employees.id,
             employees.company_id as 'company.id',
             users.id as 'user.id',
             users.name as 'user.name',
             users.username as 'user.username',
             users.active as 'user.active',
             users.group_id as 'user.group.id',
             shops.id as 'shop.id',
             shops.name as 'shop.name',
             shops.company_id as 'shop.company.id'
      FROM employees,
           users,
           shops
      WHERE employees.company_id = $1
        and employees.user_id = users.id
        and employees.shop_id = shops.id
        and users.group_id in (3,4,6)
     `;

    let employees = await sails.sendNativeQuery(SQL_DEALER, [companyId]);
    if(employees && employees.rows){
      employees = employees.rows
      employees = _.map(employees, function(employee){
        return sails.helpers.util.nested(employee);
      });
      return employees;
    }

  }


};

