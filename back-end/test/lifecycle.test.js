var sails = require('sails');

// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: { grunt: false },
    log: { level: 'warn' },
    datastore: {
      test:{
        adapter: 'sails-mysql',
        url: 'mysql://jorgem:aIR2019**@localhost:3306/inventarioRealTest',
      }}

  }, async function(err) {
    if (err) { return done(err); }

    //Clean database for test
    await sails.sendNativeQuery("update epcs set state=0 where id>0");
    await sails.sendNativeQuery("truncate productos_zonas");
    await sails.sendNativeQuery("truncate inventarios");
    await sails.sendNativeQuery("truncate users_inventarios");
    await sails.sendNativeQuery("truncate inventarios_productos");

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    return done();
  });
});

// After all tests have finished...
after(function(done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});
