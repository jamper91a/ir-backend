module.exports = {


  friendlyName: 'List all inventories',


  description: 'List all the consolidated inventories of the company of the current user. It will return even if they are collaborative or not',


  inputs: {
  },


  exits: {
    noCompany: {
      description: 'Company not found',
      responseType: 'badRequest'
    }
  },


  fn: async function () {
    let company = null;
    try {
      company = this.req.employee.company.id;
    } catch (e) {
      throw 'noCompany';
    }
    let consolidatedInventories, employeeIventories = [], employees;

    employees = await  Employees.find({
      where:{company}
    })
      .populate('inventories',{
        where:{
          consolidatedInventory: {'>': 0}
        }
      });
    // Se elimina la informacion innecesaria y se muestra solo los inventories de cada empleado
    employees.forEach(function (employee) {
      if(employee.inventories){
        employee.inventories.forEach(async function (inventory) {
          employeeIventories.push(inventory);
        })
      }
    });
    employeeIventories = employeeIventories.map(a => a.consolidatedInventory);
    consolidatedInventories = await  ConsolidatedInventories.find({
      id: {in: employeeIventories}
    });

    return consolidatedInventories;

  }


};
