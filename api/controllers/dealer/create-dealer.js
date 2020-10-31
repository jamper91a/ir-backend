module.exports = {


  friendlyName: 'Create dealer',


  description: 'Create a dealer in the system by the admin',


  inputs: {
    user:  {
      type: 'json',
      required: true,
      custom: function(value) {
        return _.isObject(value) &&
          _.isString(value.username)  &&
          _.isString(value.password)
      }
    },
    dealer:  {
      type: 'json',
      required: true,
      custom: function(value) {
        return _.isObject(value) &&
          _.isString(value.name)
      }
    }
  },


  exits: {
    userNotCreated: {
      description: 'User could not be created',
      responseType: 'serverError'
    },
    dealerNotCreated: {
      description: 'Dealer could not be created',
      responseType: 'serverError'
    }
  },


  fn: async function (inputs) {
    const user = inputs.user;
    const dealer = inputs.dealer;

    user.active = 1;
    user.group = 5;
    return await sails.getDatastore()
      .transaction(async (db) => {
        try {
          //Creo usuario
          const newUser = await Users.create(user).fetch().usingConnection(db);
          dealer.user = newUser.id;
          try {
            const newDealer = await Dealers.create(dealer).fetch().usingConnection(db);
            return {data: newDealer};
          } catch (e) {
            sails.helpers.printError({title: 'dealerNotCreated', message: e.message}, this.req);
            throw 'dealerNotCreated';
          }
        } catch (e) {
          sails.helpers.printError({title: 'userNotCreated', message: e.message}, this.req);
          throw  'userNotCreated';
        }
      });



  }


};
