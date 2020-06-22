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
            collaborative: true,
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
  describe('#Attach Inventory', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/inventory/attach')
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
    it('Employee should attach inventory', function (done) {
      //Try to create the inventory
      request
        .post('/inventory/attach')
        .send({
          products: [
            {
              zone: 1,
              product: 1,
              epc: 1
            },
            {
              zone: 1,
              product: 1,
              epc: 1
            },
            {
              zone: 1,
              product: 1,
              epc: 1
            }
          ],
          inventory: {
            collaborative: 1,
            date: '2019-03-27T01:57:17.000Z',
            consolidatedInventory: {
              id: 1
            },
            parcial: 1,
            zone: {
              shope: {
                id: 1
              },
              name: 'Bodega',
              createdAt: '2018-10-26T11:00:00.000Z',
              id: 1,
              updatedAt: '2018-10-26T11:00:00.000Z'
            },
            createdAt: '2019-03-27T01:57:17.000Z',
            id: 1,
            updatedAt: '2019-03-27T01:57:17.000Z'
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
  describe('#List Inventories', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/inventory/list')
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
    it('Should pass parameters', function (done) {
      request
        .post('/inventory/list')
        .send({
          type: 'all',
          collaborative: true
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
    it('Employee should get inventories', function (done) {
      //Try to create the inventory
      request
        .post('/inventory/list')
        .send({
          type: 'all',
          collaborative: true
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
  describe('#Consolidate Inventory', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/inventory/consolidate')
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
    it('Should pass parameters', function (done) {
      request
        .post('/inventory/consolidate')
        .send({
          inventories: [1],
          name: 'New Consolidated'
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
    it('Should not pass because inventory it is already consolidated', function (done) {
      request
        .post('/inventory/consolidate')
        .send({
          inventories: [1],
          name: 'New Consolidated'
        })
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
    it('Should not pass because inventory does not exits', function (done) {
      request
        .post('/inventory/consolidate')
        .send({
          inventories: [6],
          name: 'New Consolidated'
        })
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
  });
});

