module.exports = {


  friendlyName: 'Find employee by username',


  description: '',


  inputs: {
    user: {
      type: 'json',
      required: true,
      custom: function (user) {
        if( _.isNumber(user.group) &&
          _.contains([
            sails.config.custom.USERS_GROUP.Cashier,
            sails.config.custom.USERS_GROUP.manager,
            sails.config.custom.USERS_GROUP.warehouse,
          ], user.group)){
          return _.isObject(user) &&
            _.isString(user.username) &&
            _.isString(user.password) && _.isString(user.rpassword) && user.password === user.rpassword &&
            _.isString(user.name) &&
            _.isBoolean(user.active)
        }
        else
          return false;

      }
    },
    employee: {
      type: 'json',
      required: true,
      custom: function (employee) {
          return _.isNumber(employee.shop) && employee.shop > 0
      }
    }
  },


  exits: {
    userNoFound: {
      description: 'User no found',
      responseType: 'badRequest'
    },
    employeeNotUpdated: {
      description: 'Employee no updated',
      responseType: 'badRequest'
    },
    groupNotValid: {
      description: 'Group not valid',
      responseType: 'badRequest'
    }
  },


  fn: async function ({user, employee}) {

    const userToModify = await Users.findOne({
      where:{
        username: user.username
      }
    });
    if(userToModify){
      try{
        delete user.username;
        delete employee.user;
        delete employee.company;
        await Users.updateOne({id: userToModify.id},user);
        await Employees.updateOne({user: userToModify.id}, employee);
        return {};
      }catch(e){
        await sails.helpers.printError({title: 'employeeNotUpdated', message: e.message}, this.req, e);
        throw 'employeeNotUpdated';
      }

    }else{
      throw 'userNoFound';
    }

  }


};
