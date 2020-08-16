module.exports = {


  friendlyName: 'Create admin',


  description: 'This action is used by the dealer, to create a new company and the admin of a company. It is used on the front end',


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
    dealerNoFound: {
      description: 'Dealer not found',
      responseType: 'forbidden'
    },
    userNotCreated: {
      description: 'User could not be create',
      responseType: 'badRequest'
    },
    companyNoCreated: {
      description: 'Company could not be create',
      responseType: 'badRequest'
    },
    shopNoCreated: {
      description: 'Shop could not be create',
      responseType: 'badRequest'
    },
    employeeNotCreated: {
      description: 'Employee could not be create',
      responseType: 'badRequest'
    },
  },


  fn: async function ({user, employee}) {

    //Get the dealer
    sails.getDatastore()
      .transaction(async (db)=> {
          let dealer, newUser, company, shop, newEmployee;
          dealer = await Dealers.findOne({user: this.req.user.id});
          if(!dealer) {
            throw 'dealerNoFound';
          }
          //Creo usuario
          user.active = 1;
          user.group = sails.config.custom.USERS_GROUP.admin;
          try {
            newUser = await Users.create(req.body.user).fetch().usingConnection(db);
          } catch (e) {
            await sails.helpers.printError({title: 'userNotCreated', message: e.message}, this.req);
            throw 'userNotCreated';
          }
          employee.company.dealer = dealer.id;
          employee.company.user= newUser.id;
          try {
            company = await Companies.create(employee.company).fetch().usingConnection(db);
          } catch (e) {
            await sails.helpers.printError({title: 'companyNoCreated', message: e.message}, this.req);
            throw 'companyNoCreated';
          }
          //Create default shop, because a company must have at least one shop
          try {
            shop = await Shops.create({name: company.name, company: company.id}).fetch().usingConnection(db);
          } catch (e) {
            await sails.helpers.printError({title: 'shopNoCreated', message: e.message}, this.req);
            throw 'shopNoCreated';

          }
          employee.user = newUser.id;
          employee.company = company.id;
          employee.shop = shop.id;
          try {
            newEmployee = await Employees.create(employee).fetch().usingConnection(db);
          } catch (e) {
            await sails.helpers.printError({title: 'shopNoCreated', message: e.message}, this.req);
            throw 'shopNoCreated';
          }
          newEmployee.user = newUser;
          newEmployee.company = company;
          newEmployee.shop = shop;
          return {data: employee}
      });

  }


};
