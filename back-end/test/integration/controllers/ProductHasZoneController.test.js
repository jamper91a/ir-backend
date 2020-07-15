var request = require('supertest');
request = request('http://localhost:1337');
describe('ProductHasZoneController', function() {

  describe('#Add commodity', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/product/add-commodity')
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
    it('Should validate parameters', function (done) {
      request
        .post('/product/add-commodity')
        .send({
          products: [
            {
              zone: 1,
              product: 2,
              epc: 'E20053828213011911909C01',
              sell: 1
            },
            {
              zone: 1,
              epc: 'kajsdsadueshj43',
              devolution: 1,
              sell: 1
            }
          ],
          product: 2
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
    it('Should no be able to add epcs of a different company', function (done) {
      request
        .post('/product/add-commodity')
        .send({
          products: [
            {
              zone: 1,
              product: 2,
              epc: 'E20053828213011911909C01',
              devolution: 1,
              sell: 1
            },
            {
              zone: 1,
              product: 2,
              epc: 'kajsdsadueshj43',
              devolution: 1,
              sell: 1
            }
          ],
          product: 2,
          companyId: -1
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.manager})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'epcNotFound') {
            done();
          }
        });
    });
    it('Should be able to add the products', function (done) {
      //Try to create the inventory
      request
        .post('/product/add-commodity')
        .send({
          products: [
            {
              zone: 1,
              product: 2,
              epc: 'E20053828213011911909C01',
              devolution: 1,
              sell: 1
            },
            {
              zone: 1,
              product: 2,
              epc: 'kajsdsadueshj43',
              devolution: 1,
              sell: 1
            }
          ],
          product: 2
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
    it('Should no be able to add the same products', function (done) {
      request
        .post('/product/add-commodity')
        .send({
          products: [
            {
              zone: 1,
              product: 2,
              epc: 'E20053828213011911909C01',
              devolution: 1,
              sell: 1
            },
            {
              zone: 1,
              product: 2,
              epc: 'kajsdsadueshj43',
              devolution: 1,
              sell: 1
            }
          ],
          product: 2
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.manager})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'epcNotFound') {
            done();
          }
        });
    });

  });
  describe('#Find Product In Local By Id', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/product/find-products-in-local')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate employee shop', function (done) {
      request
        .post('/product/find-products-in-local')
        .send({
          product: 1,
          employee: {id:1}
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate employee shop id', function (done) {
      request
        .post('/product/find-products-in-local')
        .send({
          product: 1,
          employee: {shop: {id: 0}}
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not allow employee to find a product', function (done) {
      request
        .post('/product/find-products-in-local')
        .send({
          product: 1
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(403)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should allow admin to find a product', function (done) {
      request
        .post('/product/find-products-in-local')
        .send({
          product: 1
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should noT allow admin to find a product from a different company', function (done) {
      request
        .post('/product/find-products-in-local')
        .send({
          product: 1,
          employee: {
            shop: {
              id: 1
            }
          },
          company: 3
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'zonesNotFound') {
            done();
          }
        });
    });

  });
});

