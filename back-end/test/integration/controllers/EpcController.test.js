var request = require('supertest');
request = request('http://localhost:1337');
describe('EpcController', function() {

  describe('#create-epcs', function() {
    it('Should not create same epc', function (done) {
      request
        .post('/epc/create')
        .send({
          epcs: [
            {
              epc: '213123',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '232',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '23423',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '23432',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '23432',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '234324',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '234',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '2',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '234234',
              dealer: 1,
              company: 1,
              state: 0
            },
            {
              epc: '234234',
              dealer: 1,
              company: 1,
              state: 0
            }
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(500)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
    it('Dealer should create epc', function (done) {
      request
        .post('/epc/create')
        .send({
          epcs: [
            {
              epc: 'kajsdsadueshj#$#43',
              dealer: 1,
              company: 1,
              state: 0
            },
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
    it('Employee should not create epc', function (done) {
      request
        .post('/epc/create')
        .send({
          epcs: [
            {
              epc: 'kajsdsadueshj#$#432',
              dealer: 1,
              company: 1,
              state: 0
            },
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(403)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
  });
});

