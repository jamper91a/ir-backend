/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // mailgunDomain: 'transactional-mail.example.com',
  // mailgunSecret: 'key-testkeyb183848139913858e8abd9a3',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  USERS_GROUP: {
    sAdmin: 1,
    admin: 2,
    Cashier:3,
    warehouse:4,
    dealer:5,
    manager: 6
  },
  DB_ERRORS:{
    error_IP01: 'ProductHasZone must exits before add to an inventory',
    error_IP03: 'Epc must be assigned before used in an inventory'
  },
  REPORT_TYPE:{
    SELL_UNITS: 1,
    DIFFERENCE_BETWEEN_INVENTORIES: 2
  },
  DEVOLUTION: {
    NO_DEVOLUTION: 1,
    CUSTOMER: {
      WARRANTY: 2,
      SIZE_NO_MATCH: 3,
      POOR_CONDITION: 4
    },
    SUPPLIER: {
      WARRANTY: 5,
      SIZE_NO_MATCH: 6,
      POOR_CONDITION: 7
    }
  },
  DEVOLUTION_TYPE: {
    CUSTOMER: 1,
    SUPPLIER: 2
  },
  TRANSFER_TYPE:{
    IN: 'entrada',
    OUT: 'salida'
  },

  testPdf: false,
  testEmail: false,
  test: true

};
