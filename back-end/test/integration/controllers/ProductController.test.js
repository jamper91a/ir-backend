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
            sails.helpers.printTestError(err, res);
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
            sails.helpers.printTestError(err, res);
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
            sails.helpers.printTestError(err, res);
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
  describe('#Find one product', function() {
    it('Should get the product using the ean', function (done) {
      request
        .post('/product/find-one')
        .send({code: '11111'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
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
    it('Should no get the product using the ean of a different company', function (done) {
      request
        .post('/product/find-one')
        .send({code: '11111', companyId: -1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'productNotFound') {
             done();
          } else{
            done(new Error('Should not get the product'));
          }
        });

    });
    it('Should get the product using the plu', function (done) {
      request
        .post('/product/find-one')
        .send({code: 'p11111'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
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
    it('Should no ge the product using the plu of a different company', function (done) {
      request
        .post('/product/find-one')
        .send({code: 'p11111', companyId: -1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'productNotFound') {
             done();
          } else {
            done(new Error('Product should not be found'))
          }
        });
    });
    it('Should get the product using the plu2', function (done) {
      request
        .post('/product/find-one')
        .send({code: 'p211111'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
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
    it('Should no get the product using the plu2 of a different company ', function (done) {
      request
        .post('/product/find-one')
        .send({code: 'p211111', companyId: -1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'productNotFound') {
            done();
          } else {
            done(new Error('Product should not be found'))
          }
        });
    });
    it('Should get the product using the plu3', function (done) {
      request
        .post('/product/find-one')
        .send({code: 'p311111'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
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
    it('Should no get the product using the plu3 of a different company', function (done) {
      request
        .post('/product/find-one')
        .send({code: 'p311111', companyId: -1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'productNotFound') {
             done()
          } else {
            done(new Error('Product should not be found'))
          }
        });
    });
  });
  describe('#Find one product by epc', function() {
    it('Should get the product using the epc', function (done) {
      request
        .post('/product/find-by-epc')
        .send({code: '0036'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
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
    it('Should no get the product using the epc of a different company', function (done) {
      request
        .post('/product/find-by-epc')
        .send({code: '0036', companyId: -1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'epcNotFound') {
            done();
          } else {
            done(new Error('Epc should no be found'))
          }
        });
    });
    it('Should no get the product using a epc that does not exits', function (done) {
      request
        .post('/product/find-by-epc')
        .send({code: '1111'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'epcNotFound') {
            done();
          } else {
            done(new Error('Epc should not be found'))
          }
        });
    });
  });
});

