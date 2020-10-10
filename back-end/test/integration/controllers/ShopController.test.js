var request = require('supertest');
request = request('http://localhost:1337');
describe('ShopController', function() {
  describe('#Create shop', function() {
    const url='/shop/create-shop';
    it('Should validate parameters', function (done) {
      request
        .post(url)
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
    it('Should validate name', function (done) {
      request
        .post(url)
        .send({
          shop: {}
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
    it('Should allow admin', function (done) {
      request
        .post(url)
        .send({
            name: 'My new shop'
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
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
    it('Should not allow employee', function (done) {
      request
        .post(url)
        .send({
          shop: {
            name: 'My new shop'
          }
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
  });
  describe('#Find shops by company', function() {
    const url='/shop/find-shops-by-company';
    it('Should allow admin', function (done) {
      request
        .get(url)
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
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
    it('Should allow employee', function (done) {
      request
        .get(url)
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
    it('Should not allow sAdmin', function (done) {
      request
        .get(url)
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
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
  describe('#Update shop', function() {
    const url='/shop/update-shop';
    it('Should validate parameters', function (done) {
      request
        .post(url)
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
    it('Should validate name', function (done) {
      request
        .post(url)
        .send({
          name: ''
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
    it('Should validate id', function (done) {
      request
        .post(url)
        .send({
          name: 'shop updated',
          id: 0
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
    it('Should not allow employee', function (done) {
      request
        .post(url)
        .send({
            name: 'My new shop',
            id: 1
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
    it('Should allow admin', function (done) {
      request
        .post(url)
        .send({
          name: 'My shop updated',
          id: 3
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
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
});

