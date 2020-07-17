var request = require('supertest');
request = request('http://localhost:1337');
describe('ReportController', function() {

  describe('#Difference Between Inventories', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/report/difference-between-inventories')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should find not found products', function (done) {
      request
        .post('/report/difference-between-inventories')
        .send({
          firstInventory:1,
          secondInventory:2
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.body.data.length>0) {
            done();
          } else {
            done(new Error('Not found products should not be empty'));
          }

        });
    });

  });
});

