var request = require('supertest');
request = request('http://localhost:1337');
describe('ProductsController', function() {

  describe('#Create product', function() {
    it('Just manager should be allow', function (done) {
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
  describe('#Import products', function() {
    it('Just manager should be allow', function (done) {
      //Try to create the inventory
      request
        .post('/product/import')
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
        .post('/product/import')
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
    it('Manager should be able to import products', function (done) {
      //Try to create the inventory
      request
        .post('/product/import')
        .send({
          products: [
            {ean: 'Import ean 1',plu: 'Import plu 1',amount: 100,cost_price: 100,sell_price: 150,supplier: "Import supl 1"},
            {ean: 'Import ean 2',plu: 'Import plu 2',amount: 100,cost_price: 100,sell_price: 150,supplier: "Import supl 1"},
            {ean: 'Import ean 3',plu: 'Import plu 3',amount: 100,cost_price: 100,sell_price: 150,supplier: "Import supl 2"},
            {ean: 'Import ean 4',plu: 'Import plu 4',amount: 100,cost_price: 100,sell_price: 150,supplier: "Import supl 2"},
            {ean: 'Import ean 5',plu: 'Import plu 5',amount: 100,cost_price: 100,sell_price: 150},
            {ean: 'Import ean 6',plu: 'Import plu 6',amount: 100,cost_price: 100,sell_price: 150},
            {ean: 'Import ean 7',plu: 'Import plu 7',amount: 100,cost_price: 100,sell_price: 150}
          ]
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
  });
  describe('#Update product', function() {
    it('Just manager should be allow', function (done) {
      //Try to create the inventory
      request
        .post('/product/update')
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
        .post('/product/update')
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
    it('Manager should update a product without a photo', function (done) {
      //Try to create the inventory
      request
        .post('/product/update')
        .send({
          id: 3,
          withPhoto: 'false',
          ean: 'asdsadas updated',
          plu: 'kjasdkjasd updated',
          supplier: 1,
          amount: 100,
          cost_price: '200',
          sell_price: '300'
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
    it('Manager should update a product with a photo', function (done) {
      //Try to create the inventory
      request
        .post('/product/update')
        .field('id',4)
        .field('withPhoto',true)
        .field('ean','New product ean 2 updated')
        .field('plu','New product plu 2 updated')
        .field('supplier','8')
        .field('amount','200')
        .field('cost_price','350')
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
  describe('#Find products', function() {
    it('Just manager should be allow', function (done) {
      request
        .get('/product/find-all')
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
    it('Manager should get products', function (done) {
      request
        .get('/product/find-all')
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

