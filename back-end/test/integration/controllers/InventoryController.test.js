var request = require('supertest');
request = request('http://localhost:1337');
describe('InventoryController', function() {

  describe('#Create Inventory', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/inventory/create')
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
    it('Employee should create inventory', function (done) {
      //Try to create the inventory
      request
        .post('/inventory/create')
        .send({
          products: [
            {
              zone: '1',
              product: '1',
              epc: '2'
            }
          ],
          inventory: {
            parcial: true,
            collaborative: false,
            zone: 2,
            consolidatedInventory: 1
          }
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

