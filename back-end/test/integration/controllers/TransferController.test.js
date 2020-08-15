var request = require('supertest');
request = request('http://localhost:1337');
describe('TransferController', function() {
  describe('#Create transfer', function() {
    const url='/transfer/create-transfer';
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
    it('Should validate transfer', function (done) {
      request
        .post(url)
        .send({transfer: {}})
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
          transfer: {
            shopSource: 1,
            shopDestination: 2,
            message: 'New message'
          },
          products: []
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
    it('Should allow employee', function (done) {
      request
        .post(url)
        .send({
          transfer: {
            shopSource: 1,
            shopDestination: 2,
            message: 'New message'
          },
          products: [
            {product: 1, state: 0}
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
    it('Should not allow product already transferred', function (done) {
      request
        .post(url)
        .send({
          transfer: {
            shopSource: 1,
            shopDestination: 2,
            message: 'New message'
          },
          products: [
            {product: 1, state: 0}
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'productAlreadyTransferred') {
            done();
          } else {
            done('Should not allow product already transferred')
          }
        });
    });
    it('Should not allow admin', function (done) {
      request
        .post(url)
        .send({
          transfer: {
            shopSource: 1,
            shopDestination: 2,
            message: 'New message'
          },
          products: [
            {product: 1, state: 0}
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(403)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
  });
  describe('#Get Transfers by Type', function() {
    const url='/transfer/get-transfers-by-type';
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
    it('Should validate shop sources', function (done) {
      request
        .post(url)
        .send({shopSource: {}})
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
    it('Should validate type', function (done) {
      request
        .post(url)
        .send({
          shopSource: 1,
          type: 3
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
    it('Should allow employee', function (done) {
      request
        .post(url)
        .send({
          shopSource: 1,
          type: 'entrada'
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
  });
  describe('#Get Transfers by Shop', function() {
    const url='/transfer/get-transfers-by-shop';
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
    it('Should validate shop', function (done) {
      request
        .post(url)
        .send({shop: 'dfdf'})
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
    it('Should allow employee', function (done) {
      request
        .post(url)
        .send({
          shop: 1
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
  });
});

