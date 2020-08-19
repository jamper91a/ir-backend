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
  'company/get-companies-by-dealer' : ['isAuthenticated','isDealer'],
  'company/get-company-by-id' : ['isAuthenticated'],
  'company/get-employees-by-admin' : ['isAuthenticated','isAdmin'],
  'company/update' : ['isAuthenticated','isAdmin'],

  'consolidated-inventory/last-inventory' : ['isAuthenticated'],
  'consolidated-inventory/last-inventory-by-employee' : ['isAuthenticated','isAdmin'],
  'consolidated-inventory/list-all' : ['isAuthenticated'], //Policies in the controller
  'consolidated-inventory/list-by-collaborative' : ['isAuthenticated', 'isEmployee'],
  'consolidated-inventory/list-products' : ['isAuthenticated'],

  'dealer/create-dealer': ['isAuthenticated', 'isSAdmin'],
  'dealer/get-all-active-dealers': ['isAuthenticated', 'isSAdmin'],
  'dealer/get-all-dealers': ['isAuthenticated', 'isSAdmin'],
  'dealer/update-dealer': ['isAuthenticated'], //Policies in the controller

  'devolution/return-products': ['isAuthenticated'], //Policies in the controller'


  'epc/create-epc' : ['isAuthenticated','isDealer'],
  'epc/tags-by-company-monthly' : ['isAuthenticated','isDealer'],
  'epc/tags-by-dealer-monthly' : ['isAuthenticated','isDealer'],


  'inventory/attach-inventory' : ['isAuthenticated','isEmployee'],
  'inventory/consolidate-inventory' : ['isAuthenticated','isEmployee'],
  'inventory/create-inventory' : ['isAuthenticated','isEmployee'],
  'inventory/list-inventories' : ['isAuthenticated','isEmployee'],
  'inventory/list-products' : ['isAuthenticated'],

  'inventory-erp/create-inventory-erp' : ['isAuthenticated', 'isEmployee'],

  'pdf/create-pdf' : ['isAuthenticated'],

  'product/create-product': ['isAuthenticated', 'isAdmin'],
  'product/find-one-product': ['isAuthenticated'],
  'product/find-product-by-epc': ['isAuthenticated'],
  'product/find-products': ['isAuthenticated', 'isAdmin'],
  'product/import-products': ['isAuthenticated', 'isAdmin'],
  'product/update-product': ['isAuthenticated', 'isAdmin'],


  'product-has-zone/add-commodity': ['isAuthenticated'],
  'product-has-zone/find-products-in-local-by-id': ['isAuthenticated', 'isAdmin'],
  'product-has-zone/find-products-in-local-by-epc': ['isAuthenticated', 'isAdmin'],

  'report/difference-between-inventories': ['isAuthenticated'],
  'report/save-report': ['isAuthenticated'],
  'report/get-reports-by-type': ['isAuthenticated', 'isEmployee'],
  'report/get-report-by-id': ['isAuthenticated', 'isEmployee'],
  'report/homologate-units': ['isAuthenticated', 'isEmployee'],
  'report/sale-units': ['isAuthenticated', 'isEmployee'],
  'report/rotation-units': ['isAuthenticated'], //Policies in the controller
  'report/devolutions-by-type': ['isAuthenticated'], //Policies in the controller
  'report/rotation-proyected-by-ean-plu': ['isAuthenticated'], //Policies in the controller
  'report/difference-with-inventory-erp': ['isAuthenticated'], //Policies in the controller

  'sell/create-sell': ['isAuthenticated', 'isEmployee'],

  'shop/create-shop': ['isAuthenticated', 'isAdmin'],
  'shop/find-shops-by-company': ['isAuthenticated'],  //Policies in the controller,

  'supplier/create-supplier': ['isAuthenticated', 'isAdmin'],
  'supplier/find-suppliers-by-company': ['isAuthenticated'],  //Policies in the controller,

  'transfer/create-transfer': ['isAuthenticated', 'isEmployee'],
  'transfer/get-transfers-by-type': ['isAuthenticated', 'isEmployee'],
  'transfer/get-transfers-by-shop': ['isAuthenticated', 'isEmployee'],
  'transfer/finish-transfer': ['isAuthenticated', 'isEmployee'],

  'user/create-employee': ['isAuthenticated', 'isAdmin'],
  'user/create-admin': ['isAuthenticated', 'isDealer'],
  'user/update-admin': ['isAuthenticated', 'isDealer'],
  'user/login': true,
  'user/login-web': true,
  'user/sync': ['isAuthenticated', 'isEmployee'],
  'user/find-employee-by-username': ['isAuthenticated', 'isAdmin'],
  'user/modify-employee-by-username': ['isAuthenticated', 'isAdmin'],
  'user/list-employees-by-company': ['isAuthenticated', 'isAdmin'],

  'zone/list-zones-by-shop': ['isAuthenticated', 'isAdmin'],

};
