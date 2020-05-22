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
    employees = await Employees
      .find({company})
      .populate
        ('user',
          {
            group: [
              sails.config.custom.USERS_GROUP.Cajero,
              sails.config.custom.USERS_GROUP.Bodega,
              sails.config.custom.USERS_GROUP.AdministradorLocal,
            ]
          }
        )
      .populate('shop');

    return employees;

  }


};
