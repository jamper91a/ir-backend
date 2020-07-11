var request = require('supertest');
request = request('http://localhost:1337');
describe('ProductsController', function() {

  describe('#Create product', function() {
    it('Manager should be allow', function (done) {
      //Try to create the inventory
      request
        .post('/product/create')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(403)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
    it('Should validate parameters', function (done) {
      request
        .post('/product/create')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.manager})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            // console.log(err);
            return done(err);
          }
          done();
        });
    });

    it('Manager should create a product without a photo', function (done) {
      //Try to create the inventory
      request
        .post('/product/create')
        .send({
          withPhoto: false,
          ean: 'asdsadas',
          plu: 'kjasdkjasd',
          supplier: 1,
          amount: 100,
          cost_price: '150',
          sell_price: '200'
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.manager})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });

    });
    it('Manager should create a product with a photo', function (done) {
      //Try to create the inventory
      request
        .post('/product/create')
        .field('withPhoto','true')
        .field('ean','New product ean 2')
        .field('plu','New product plu 2')
        .field('supplier','2')
        .field('amount','200')
        .field('cost_price','250')
        .field('sell_price','350')
        .attach('photo', 'test/files/chat1.png')
        .set({Authorization: "Bearer " + sails.config.custom.tokens.manager})
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

