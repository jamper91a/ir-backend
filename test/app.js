// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
var sails;
var rc;
var fs = require('fs');
try {
  sails = require('sails');
  rc = require('sails/accessible/rc');
  process.env.NODE_ENV = 'test';
  sails.lift({
    hooks: { grunt: false },
    log: { level: 'info' },

  }, async function(err) {
    if (err) {
      console.error('Encountered an error when attempting to require(\'sails\'):');
      console.error(err.stack);
      console.error('--');
      console.error('To run an app using `node app.js`, you need to have Sails installed');
      console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
      console.error('in the same directory as your app and run `npm install`.');
      console.error();
      console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
      console.error('also run this app with `sails lift`.  Running with `sails lift` will');
      console.error('not run this file (`app.js`), but it will do exactly the same thing.');
      console.error('(It even uses your app directory\'s local Sails install, if possible.)');
      return;
    }

    //Clean database for test
    var tablets = fs.readFileSync('test/sql/tables.sql', 'utf8');
    await sails.sendNativeQuery(tablets);
    var inserts = fs.readFileSync('test/sql/inserts.sql', 'utf8');
    await sails.sendNativeQuery(inserts);
    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    return;
  });
} catch (err) {
  console.error('Encountered an error when attempting to require(\'sails\'):');
  console.error(err.stack);
  console.error('--');
  console.error('To run an app using `node app.js`, you need to have Sails installed');
  console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
  console.error('in the same directory as your app and run `npm install`.');
  console.error();
  console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
  console.error('also run this app with `sails lift`.  Running with `sails lift` will');
  console.error('not run this file (`app.js`), but it will do exactly the same thing.');
  console.error('(It even uses your app directory\'s local Sails install, if possible.)');
  return;
}//-•
// process.env.NODE_ENV = 'test';
//
// // Start server
// sails.lift(rc('sails'));
//
//
// var sails = require('sails');
// var fs = require('fs');
//
// // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
// // this.timeout(10000);
// process.env.NODE_ENV = 'test';
// sails.lift({
//   hooks: { grunt: false },
//   log: { level: 'info' },
//
// }, async function(err) {
//   if (err) { return done(err); }
//
//   //Clean database for test
//   var tablets = fs.readFileSync('test/sql/tables.sql', 'utf8');
//   await sails.sendNativeQuery(tablets);
//   var inserts = fs.readFileSync('test/sql/inserts.sql', 'utf8');
//   await sails.sendNativeQuery(inserts);
//   // here you can load fixtures, etc.
//   // (for example, you might want to create some records in the database)
//
//   // return  done();
// });
