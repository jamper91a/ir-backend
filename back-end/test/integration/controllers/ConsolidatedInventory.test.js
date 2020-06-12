var request = require('supertest');
request = request('http://localhost:1337');
describe('ConsolidatedInventoryController', function() {

  describe('#LastInventory', function() {
    it('Employee Should get information', function (done) {
      request
        .post('/ci/lastInventory')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
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
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
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
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
    it('Employee should get information', function (done) {
      request
        .post('/ci/listAll')
        .send({id:1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
  });
});

