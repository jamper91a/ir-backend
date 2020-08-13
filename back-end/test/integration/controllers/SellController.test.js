var request = require('supertest');
request = request('http://localhost:1337');
describe('SellController', function() {
  describe('#Create a sell', function() {
    const url='/sell/create-sell';
    it('Should validate parameters', function (done) {
      request
        .post(url)
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
    it('Should validate sell', function (done) {
      request
        .post(url)
        .send({
          sell: {}
        })
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
    it('Should validate products', function (done) {
      request
        .post(url)
        .send({
          sell: {
            user: 1
          },
          products: {}
        })
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
    it('Should not allow sAdmin', function (done) {
      request
        .post(url)
        .send({
          sell: {
            user: 1
          },
          products: [
            {id: 51, product_id: 4}
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
        .expect(403)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should allow employee', function (done) {
      request
        .post(url)
        .send({
          sell: {
            user: 1
          },
          products: [
            {id: 3, product_id: 4},
            {id: 4, product_id: 4}
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not be able to sell same products', function (done) {
      request
        .post(url)
        .send({
          sell: {
            user: 1
          },
          products: [
            {id: 3, product_id: 4},
            {id: 4, product_id: 4}
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'productsNoValid') {
            done();
          }
        });
    });
  });
});

