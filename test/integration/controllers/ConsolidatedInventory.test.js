var request = require('supertest');
request = request('http://localhost:1337');
describe('ConsolidatedInventoryController', function() {

  describe('#LastInventory', function() {
    it('Employee Should get information Json', function (done) {
      request
        .post('/ci/lastInventory')
        .send({json: true})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              try {
                await sails.helpers.validation.responses.ci.validateLastInventory(res.body);
                done();
              } catch (e) {
                console.error(e);
                done(new Error('No valid Json'));
              }
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Employee Should get information', function (done) {
      request
        .post('/ci/lastInventory')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              try {
                await sails.helpers.validation.responses.ci.validateLastInventory(res.body);
                done();
              } catch (e) {
                console.error(e);
                done(new Error('No valid Json'));
              }
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
  });
  describe('#LastInventoryByEmployee', function() {
    it('Admin Should get information', function (done) {
      request
        .post('/ci/lastInventoryByEmployee')
        .send({id: 1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              try {
                await sails.helpers.validation.responses.ci.validateLastInventory(res.body);
                done();
              } catch (e) {
                console.error(e);
                done(new Error('No valid Json'));
              }
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Employee should no get information', function (done) {
      request
        .post('/ci/lastInventoryByEmployee')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(403)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
  });
  describe('#ListAllConsolidatedInventories', function() {
    it('Admin Should get information', function (done) {
      request
        .post('/ci/listAll')
        .send({id: 1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              try {
                await sails.helpers.validation.responses.ci.validateAll(res.body);
                done();
              } catch (e) {
                console.error(e);
                done(new Error('No valid Json'));
              }
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Employee should get information', function (done) {
      request
        .post('/ci/listAll')
        .send({id:1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              try {
                await sails.helpers.validation.responses.ci.validateAll(res.body);
                done();
              } catch (e) {
                console.error(e);
                done(new Error('No valid Json'));
              }
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
  });
  describe('#ListAllConsolidatedInventoriesByCollaborative', function() {
    it('Cashier should get information', function (done) {
      request
        .post('/ci/listByCollaborative')
        .send({collaborative: 1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.cashier})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              await sails.helpers.validation.responses.ci.validateAll(res.body);
              done();
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Cashier should get information', function (done) {
      request
        .post('/ci/listByCollaborative')
        .send({collaborative: 0})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.cashier})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              await sails.helpers.validation.responses.ci.validateAll(res.body);
              done();
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Warehouse should get information', function (done) {
      request
        .post('/ci/listByCollaborative')
        .send({collaborative: 1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              await sails.helpers.validation.responses.ci.validateAll(res.body);
              done();
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Warehouse should get information', function (done) {
      request
        .post('/ci/listByCollaborative')
        .send({collaborative: 0})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              await sails.helpers.validation.responses.ci.validateAll(res.body);
              done();
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
  });
  describe('#ListProducts', function() {
    it('Cashier should get information', function (done) {
      request
        .post('/ci/listByCollaborative')
        .send({collaborative: 1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.cashier})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              done();
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Cashier should get information', function (done) {
      request
        .post('/ci/listByCollaborative')
        .send({collaborative: 0})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.cashier})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              done();
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Warehouse should get information', function (done) {
      request
        .post('/ci/listByCollaborative')
        .send({collaborative: 1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              done();
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
    it('Warehouse should get information', function (done) {
      request
        .post('/ci/listByCollaborative')
        .send({collaborative: 0})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
           try{

            JSON.parse(JSON.stringify(res.body));
            if(res.headers['content-type'].includes('application/json')) {
              done();
            } else {
              done(new Error('No valid Json format'));
            }

          } catch (e) {
            console.error(e);
            return done(e);
          }
        });
    });
  });
});

