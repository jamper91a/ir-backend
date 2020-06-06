module.exports = {


  friendlyName: 'Update',


  description: 'Update dealer.',


  inputs: {
    user:  {
      type: 'json',
      required: false,
      defaultsTo: false,
      custom: function(value) {
        return _.isObject(value) &&
          _.isString(value.username)
      }
    },
    dealer:  {
      type: 'json',
      required: false,
      defaultsTo: false,
      custom: function(value) {
        return _.isObject(value) &&
          _.isString(value.name)
      }
    }
  },


  exits: {
    userNotUpdated: {
      description: 'User could not be updated',
      responseType: 'serverError'
    },
    dealerNotUpdated: {
      description: 'Dealer could not be updated',
      responseType: 'serverError'
    }
  },


  fn: async function (inputs) {
    const user = inputs.user;
    const dealer = inputs.dealer;
    await sails.getDatastore()
      .transaction(async (db) => {
        //Find the user
        try {
          await Users.updateOne({id: user.id}, user).usingConnection(db);
          try {
            await Dealers.updateOne({user: user.id}, dealer).usingConnection(db);
            return {};
          } catch (e) {
            await sails.helpers.printError({title: 'dealerNotUpdated', message: e.message}, this.req, dealer);
            throw 'dealerNotUpdated';
          }
        } catch (e) {
          await sails.helpers.printError({title: 'userNotUpdated', message: e.message}, this.req, user);
          throw 'userNotUpdated';
        }
      });


  }


};
