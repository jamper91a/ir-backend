module.exports = {


  friendlyName: 'List inventories by collaborative',


  description: 'List all the consolidated inventories of the company of the current user filter by collaborative',


  inputs: {
    collaborative: {
      type: "number",
      required: true,
      description: '1 if we must list collaborative inventories, or 0 if not'
    }
  },


  exits: {
    noCompany: {
      description: 'Company not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({collaborative}) {
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
          consolidatedInventory: {'>': 0},
          collaborative: collaborative
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

    return {data:consolidatedInventories};

  }


};
