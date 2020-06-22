var sails = require('sails');
var fs = require('fs');
// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(10000);
  process.env.NODE_ENV = 'test';
  sails.lift({
    hooks: { grunt: false },
    log: { level: 'info' },

  }, async function(err) {
    if (err) { return done(err); }

    //Clean database for test
    var tablets = fs.readFileSync('test/sql/tables.sql', 'utf8');
    await sails.sendNativeQuery(tablets);
    var inserts = fs.readFileSync('test/sql/inserts.sql', 'utf8');
    await sails.sendNativeQuery(inserts);
    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    return done();
  });
});

// After all tests have finished...
after(async function() {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)
//Clean database for test
  var tablets = fs.readFileSync('test/sql/tables.sql', 'utf8');
  await sails.sendNativeQuery(tablets);
  var inserts = fs.readFileSync('test/sql/inserts.sql', 'utf8');
  await sails.sendNativeQuery(inserts);
  sails.lower();

});
