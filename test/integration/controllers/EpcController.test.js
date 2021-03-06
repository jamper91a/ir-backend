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
        .expect(400)
        .end(function(err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'epcNotValid') {
             done();
          } else {
            done('Should not allow same key on an epc')
          }
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
  describe('#Tags by Dealer monthly', function() {
    it('Dealer should get data', function (done) {
      request
        .post('/epc/tagsByDealerByMonth')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
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
    it('sAdmin should not get data', function (done) {
      request
        .post('/epc/tagsByDealerByMonth')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
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
  describe('#Tags by Company monthly', function() {
    it('Dealer should get data', function (done) {
      request
        .post('/epc/tagsByCompanyByMonth')
        .send({
          id: 1
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(200)
        .end(function(err, res) {
          if (err){
            // console.log(err);
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
    it('It should ask for company id', function (done) {
      request
        .post('/epc/tagsByCompanyByMonth')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(400)
        .end(function(err, res) {
          if (err){
            // console.log(err);
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
    it('sAdmin should not get data', function (done) {
      request
        .post('/epc/tagsByCompanyByMonth')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
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

