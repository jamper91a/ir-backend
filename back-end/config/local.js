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
        // url: 'mysql://root:jamper91@localhost:3306/inventarioRealEn',
      timezone: 'utc-5',
      multipleStatements: true
    },

  },
  blueprints: {
    shortcuts: false,
    rest: false,
  },
  security: {

    cors: {
      allRoutes: true,
      allowOrigins: ['http://localhost:8100', 'http://coexnort.servehttp.com:8044', 'https://inventario-real.firebaseapp.com', 'http://localhost:4200'],
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
      // employee: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MiwidXNlcl9pZCI6MywidXNlcm5hbWUiOiJjYWplcm9AaXIuY29tIiwiY29tcGFueV9pZCI6MSwic2hvcF9pZCI6MSwiaWF0IjoxNTkxNDk2MjU1fQ.GS8H1dWtz1PhreNR6v-vyRcUSm3TJldWgkdVBhDsyro',
      // dealer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE1OTE0OTgzMTl9.-cc10pNEFx4sGciFIUbV9mwXtvwgcrE8kMFvGLgreC8'
    },
    testPdf: true,
    testEmail: false,
    test: true
  }
};
