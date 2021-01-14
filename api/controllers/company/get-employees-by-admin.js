
module.exports = {


  friendlyName: 'Get Employees by Admin',


  description: 'Get the employees of a company. It is used by the admin of the company',


  inputs: {
  },


  exits: {
    noEmployees: {
      description: 'No employees',
      responseType: 'badRequest'
    },
    noCompany: {
      description: 'Company not found',
      responseType: 'badRequest'
    }
  },


  fn: async function () {
    let company = null, employees = null;
    try {
      company = this.req.employee.company.id;
    } catch (e) {
      throw 'noCompany'
    }

    if(sails.config.custom.rawQueries){
      try {
        employees = await sails.helpers.queries.company.getEmployeesByAdmin(company);
      } catch (e) {
        throw e;
      }
    } else {
      employees = await Employees
        .find({company})
        .populate
        ('user',
          {
            group: [
              sails.config.custom.USERS_GROUP.Cashier,
              sails.config.custom.USERS_GROUP.warehouse,
              sails.config.custom.USERS_GROUP.manager,
            ]
          }
        )
        .populate('shop');

    }
    return  {data: employees};



  }


};
