module.exports = {


  friendlyName: 'Update admin',


  description: '',


  inputs: {
    user: {
      type: 'json',
      required: true,
      custom: function (user) {
        return _.isObject(user) &&
          _.isString(user.username) && user.username &&
          _.isString(user.password) && user.password
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


    return await sails.getDatastore()
      .transaction(async (db)=> {
        let userUpdated;
        try {
          userUpdated = await Users.updateOne({username: user.username}, user).usingConnection(db);
        } catch (e) {
          await sails.helpers.printError({title: 'userNoUpdated', message: e.message}, this.req);
          throw 'userNoUpdated';
        }
        try {
          await Companies.updateOne({user: userUpdated.id}, employee.company).usingConnection(db);
        } catch (e) {
          await sails.helpers.printError({title: 'companyNoUpdated', message: e.message}, this.req);
          throw 'companyNoUpdated';
        }

        return {};
      });

  }


};
