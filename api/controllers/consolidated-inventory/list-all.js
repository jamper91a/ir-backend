module.exports = {


  friendlyName: 'List all inventories',


  description: 'List all the consolidated inventories of the company of the current user. ' +
    'It will return even if they are collaborative or not. It is used in the front-end and app',


  inputs: {
  },


  exits: {
    noCompany: {
      description: 'Company not found',
      responseType: 'badRequest'
    },
    notAllow: {
      description: 'User no allow',
      responseType: 'forbidden'
    }
  },


  fn: async function () {
    //Check permissions
    if(sails.helpers.policies.canBeAnyOfThese(
      [
        sails.config.custom.USERS_GROUP.admin,
        sails.config.custom.USERS_GROUP.warehouse,
        sails.config.custom.USERS_GROUP.Cashier,
      ],
      this.req.user.group)
    ) {
      let company = null;
      try {
        company = this.req.employee.company.id;
      } catch (e) {
        throw 'noCompany';
      }
      let consolidatedInventories;

      if(sails.config.custom.rawQueries){
        try {
          consolidatedInventories = await sails.helpers.queries.ci.getAllByCompany(company);
        } catch (e) {
          throw e;
        }
      } else
        {
        let employeeInventories = [], employees
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
              employeeInventories.push(inventory);
            })
          }
        });
        employeeInventories = employeeInventories.map(a => a.consolidatedInventory);
        consolidatedInventories = await  ConsolidatedInventories.find({
          id: {in: employeeInventories}
        });
      }



      return {data:consolidatedInventories};
    } else {
      throw 'notAllow';
    }


  }


};
