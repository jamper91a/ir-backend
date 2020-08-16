const passport = require('passport');
const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },


  exits: {
    noEmployee: {
      description: 'No employee information',
      responseType: 'badRequest'
    }
  },


  fn: async function (inputs, exits) {
    const self = this;

      passport.authenticate('local', async function (err, employee, user, info) {
          if (err || !employee) {
            await sails.helpers.printError({title: 'login', message: err}, self.req, info);
            return exits.noEmployee();
          }
          self.req.login(employee, {session: false}, async (err) => {
            try {
              if (err) {
                return exits.badRequest();
              }
              if (employee) {
                const token = jwt.sign(
                  {
                    employee_id: employee.id,
                    user_id: employee.user.id,
                    username: employee.user.username,
                    company_id: employee.company.id,
                    shop_id: employee.shop.id
                  },
                  'k{B^um3fzwP-68cN');
                let data = {
                  employee,
                  token
                };
                return exits.success(data);
              } else {
                return exits.noEmployee();
              }
            } catch (e) {
              return exits.serverError(e);
            }
          });
      })(self.req, self.res);

  }


};
