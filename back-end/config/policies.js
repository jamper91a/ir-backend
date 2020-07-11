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
  'consolidated-inventory/list-all' : ['isAuthenticated'], //Policies in the controller
  'consolidated-inventory/list-by-collaborative' : ['isAuthenticated', 'isEmployee'],

  'dealer/create-dealer': ['isAuthenticated', 'isSAdmin'],
  'dealer/get-all-active-dealers': ['isAuthenticated', 'isSAdmin'],
  'dealer/get-all-dealers': ['isAuthenticated', 'isSAdmin'],
  'dealer/update-dealer': ['isAuthenticated'], //Policies in the controller


  'epc/create-epc' : ['isAuthenticated','isDealer'],
  'epc/tags-by-dealer-monthly' : ['isAuthenticated','isDealer'],
  'epc/tags-by-company-monthly' : ['isAuthenticated','isDealer'],


  'inventory/create-inventory' : ['isAuthenticated','isEmployee'],
  'inventory/attach-inventory' : ['isAuthenticated','isEmployee'],
  'inventory/list-inventories' : ['isAuthenticated','isEmployee'],
  'inventory/consolidate-inventory' : ['isAuthenticated','isEmployee'],

  'inventory-erp/create-inventory-erp' : ['isAuthenticated', 'isEmployee'],

  'pdf/create-pdf' : ['isAuthenticated'],

  'product/create-product': ['isAuthenticated', 'isAdmin']

};
