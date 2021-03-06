module.exports = {


  friendlyName: 'Update admin',


  description: '',


  inputs: {
    user: {
      type: 'json',
      required: true,
      custom: function (user) {
        let password = true;
        if(user.password){
          password =_.isString(user.password) && _.isString(user.rpassword) && user.password === user.rpassword
        }
        return _.isObject(user) &&
          _.isString(user.username)  && password
      }
    },
    employee: {
      type: 'json',
      required: true,
      custom: function (user) {
        return _.isObject(user) &&
          _.isObject(user.company) &&
          _.isString(user.company.name) && user.company.name
      }
    }
  },


  exits: {
    userNoUpdated: {
      description: 'User could not be update',
      responseType: 'badRequest'
    },
    companyNoUpdated: {
      description: 'Company could not be update',
      responseType: 'badRequest'
    },
  },


  fn: async function ({user, employee}) {
    user.group = sails.config.custom.USERS_GROUP.admin;

    return await sails.getDatastore()
      .transaction(async (db)=> {
        let userUpdated;
        try {
          userUpdated = await Users.updateOne({username: user.username}, user).usingConnection(db);
        } catch (e) {
          sails.helpers.printError({title: 'userNoUpdated', message: e.message}, this.req);
          throw 'userNoUpdated';
        }
        try {
          await Companies.updateOne({user: userUpdated.id}, employee.company).usingConnection(db);
        } catch (e) {
          sails.helpers.printError({title: 'companyNoUpdated', message: e.message}, this.req);
          throw 'companyNoUpdated';
        }

        return {};
      });

  }


};
