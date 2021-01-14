module.exports = {


  friendlyName: 'Validate companies',


  description: '',


  inputs: {
      body: {
        type: 'ref',
        required: true
      }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    companiesByAdminFormatNoValid: {
      description: 'Format no valid',
    },
    employeesNoValid: {
      description: 'Format no valid',
    }

  },


  fn: async function ({body}) {

    const employees = body.data;
    if(_.isArray(employees))
    {
      const allEmployees = _.every(employees, function (employee) {
        const company = employee.company;
        const user = employee.user;
        const shop = employee.shop;

        const companyValid =  _.isObject(company) &&
          _.isNumber(company.id) && company.id>0;

        const userValid =  _.isObject(user) &&
          _.isNumber(user.id) && user.id>0 &&
          _.isString(user.name) &&
          _.isString(user.username) &&
          _.isNumber(user.active) &&
          _.isObject(user.group) && _.isNumber(user.group.id) && user.group.id > 0;

        const shopIsValid = _.isObject(shop) &&
          _.isNumber(shop.id) && shop.id>0 &&
          _.isString(shop.name) &&
          _.isObject(shop.company) && _.isNumber(shop.company.id) && shop.company.id > 0;

        if(!companyValid){
          console.log('Company no valid');

          console.log(company);
          return false;
        }
        if(!userValid){
          console.log('User no valid');
          console.log(user);
          return false;
        }
        if(!shopIsValid){
          console.log('Shop no valid');
          console.log(shop);
          return false
        }

        return true;
      });
      if(!allEmployees)
        throw 'employeesNoValid';

      return true;

    } else{
      throw 'companiesByAdminFormatNoValid'
    }

  }


};

