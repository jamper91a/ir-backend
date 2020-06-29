var request = require('supertest');
request = request('http://localhost:1337');
describe('InventoryErpController', function() {

  describe('#Create Inventory Erp', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/inventory-erp/create')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
    it('Should validate products', function (done) {
      //Try to create the inventory
      request
        .post('/inventory-erp/create')
        .send({
          products: [
            {
              zone: '1',
              product: '1',
              epc: '2'
            }
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
    it('Employee should create inventory', function (done) {
      //Try to create the inventory
      request
        .post('/inventory-erp/create')
        .send({
          products: [
            {
              ean: '1111',
              total: 10
            }
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
  });
});

