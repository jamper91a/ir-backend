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
      url: 'mysql://ir:Ir2020++@localhost:3306/inventarioRealEn',

    },

  },
  port: 1337,
  models: {
    migrate: 'safe',
  },
  blueprints: {
    shortcuts: true,
    rest: true,
  },

  security: {

    /***************************************************************************
    *                                                                          *
    * If this app has CORS enabled (see `config/security.js`) with the         *
    * `allowCredentials` setting enabled, then you should uncomment the        *
    * `allowOrigins` whitelist below.  This sets which "origins" are allowed   *
    * to send cross-domain (CORS) requests to your Sails app.                  *
    *                                                                          *
    * > Replace "https://example.com" with the URL of your production server.  *
    * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
    *                                                                          *
    ***************************************************************************/
    cors: {
      allRoutes: true,
      allowOrigins: ['http://ir.colombians.dev', 'https://inventario-real.firebaseapp.com', 'https://ir.colombians.dev'],
      allowCredentials: true,
      allowRequestHeaders: "content-type, authorization"
    },
    csrf: true

  },
  log: {
    level: 'info'
  },

  sockets: {
    onlyAllowOrigins: [],
    adapter: '@sailshq/socket.io-redis',
    db: '5',
    host: '127.0.0.1',
    pass: 'nr3Ywq?U&n~wCFtN)Rp?RTX*BpnQw2nKmk@W}^qAuq&nv8ZN!y:BeC?',
    port: '6379'
  },
  custom:{
    testPdf: false,
    test: false
  },
  http: {
    trustProxy: true
  }
};
