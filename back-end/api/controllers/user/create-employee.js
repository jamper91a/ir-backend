module.exports = {


  friendlyName: 'Create employee',


  description: 'Action used by the admin of the company to create employees for the app. It is used from the front end',


  inputs: {
    user: {
      type: 'json',
      required: true,
      custom: function (user) {
        return _.isObject(user) &&
          _.isString(user.username) &&
          _.isString(user.name) &&
          _.isString(user.password) && _.isString(user.rpassword) && user.password === user.rpassword &&
          _.isNumber(user.group) && (user.group === 3 || user.group === 4 )
      }
    },
    employee: {
      type: 'json',
      required: true,
      custom: function (user) {
        return _.isObject(user) &&
          _.isNumber(user.company) && user.company > 0 &&
          _.isNumber(user.shop) && user.shop > 0
      }
    }
  },


  exits: {
    userNotCreated: {
      description: 'User could not be create',
      responseType: 'badRequest'
    },
    employeeNotCreated: {
      description: 'Employee could not be create',
      responseType: 'badRequest'
    },
  },


  fn: async function ({user, employee}) {

    let newUser, newEmployee;
    //Creo usuario
    try {
      user.active = 1;
      newUser = await Users.create(user).fetch();
    } catch (e) {
      await sails.helpers.printError({title: 'userNotCreated', message: e.message}, this.req);
      throw 'userNotCreated';
    }
    try {
      employee.user = newUser.id
      newEmployee = await Employees.create(employee).fetch();
    } catch (e) {
      await sails.helpers.printError({title: 'employeeNotCreated', message: e.message}, this.req);
      throw 'employeeNotCreated';
    }
    return {data: newEmployee};


  }


};
