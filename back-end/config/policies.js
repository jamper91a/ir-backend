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
  'epc/create-epc' : ['isAuthenticated','isDealer'],
  'epc/tags-by-dealer-monthly' : ['isAuthenticated','isDealer'],

};
