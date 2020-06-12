/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  '*': ['isAuthenticated'],
  // '*': true,

  UsersController: {
    'login': true,
    'loginWeb': true
  },
  ReportsController: {
    'sendReport': true
  },
  'company/get-company-by-id' : ['isAuthenticated'],
  'company/get-companies-by-dealer' : ['isAuthenticated','isDealer'],
  'company/get-employees-by-admin' : ['isAuthenticated','isAdmin'],

  'consolidated-inventory/last-inventory-by-employee' : ['isAuthenticated','isAdmin'],
  'consolidated-inventory/list-all' : ['isAuthenticated'],


  'epc/create-epc' : ['isAuthenticated','isDealer'],
  'epc/tags-by-dealer-monthly' : ['isAuthenticated','isDealer'],

};
