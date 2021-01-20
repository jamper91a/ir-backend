/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {
  datastores: {
    default: {
        adapter: 'sails-mysql',
      url: 'mysql://root:jamper91@localhost:3306/inventarioRealTest',
      timezone: 'utc-5',
      multipleStatements: true
    },

  },
  blueprints: {
    shortcuts: true,
    rest: true,
  },
  security: {

    cors: {
      allRoutes: true,
      allowOrigins: ['http://localhost:8100', 'http://coexnort.servehttp.com:8044', 'https://inventario-real.firebaseapp.com'],
      allowCredentials: true,
      allowRequestHeaders: "content-type, authorization"
    },

  },
  log: {
    level: 'info'
  },

  sockets: {
    onlyAllowOrigins: []
  },
  custom: {
    tokens: {
      employee: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MiwidXNlcl9pZCI6MywidXNlcm5hbWUiOiJjYWplcm9AaXIuY29tIiwiY29tcGFueV9pZCI6MSwic2hvcF9pZCI6MSwiaWF0IjoxNTkxNDk2MjU1fQ.GS8H1dWtz1PhreNR6v-vyRcUSm3TJldWgkdVBhDsyro',
      dealer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE1OTE4NjE0Mzl9.DUudqLu-5X-nyAvlGBKBftWyur6KNhLUv7GgmFnevPA',
      manager: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1OTE4NTgzOTR9.qKHSdyi_CuidaOKkwpjDto3EQkmUGP_UP46b5vWCdpM',
      cashier: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MiwidXNlcl9pZCI6MywidXNlcm5hbWUiOiJjYWplcm9AaXIuY29tIiwiY29tcGFueV9pZCI6MSwic2hvcF9pZCI6MSwiaWF0IjoxNTk3ODg4MDUwfQ.ErGc_aZJnvgBCoD0Poex2xcmSHtlnqnVvmhxL3_aqVg',
      admin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1OTE4NTgzOTR9.qKHSdyi_CuidaOKkwpjDto3EQkmUGP_UP46b5vWCdpM',
      admin2: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJpYXQiOjE1OTc4MTMwNDR9.gKyxzUbvPUpaxgc3IfwW5-wRaaSqc7_p-ao1nedRys4',
      sAdmin: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE1OTIwODk2MTB9.ivZftEIfTNos5b-a3tJW0s-yUt0jV6uDY4hR01aI2cI'
    },
    dbName: 'inventarioRealTest',
    testPdf: false,
    testEmail: false,
    test: true,
    rawQueries: true
  },
  port: 1338

};
