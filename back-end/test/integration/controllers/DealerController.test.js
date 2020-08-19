var request = require('supertest');
request = request('http://localhost:1337');
describe('DealerController', function() {

  describe('#CreateDealer', function() {
    it('sAdmin should create dealer', function (done) {
      request
        .post('/dealer/create')
        .send({
          user: {
            username: 'newDealer',
            password: '12345'
          },
          dealer: {
            name: 'newDealer'
          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
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
    it('Just one dealer with same data', function (done) {
      request
        .post('/dealer/create')
        .send({
          user: {
            username: 'newDealer',
            password: '12345'
          },
          dealer: {
            name: 'newDealer'
          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
        .expect(500)
        .end(function(err, res) {
          if (err){
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
    it('No sAdmin should no create dealer', function (done) {
      request
        .post('/dealer/create')
        .send({
          user: {
            username: 'alex33',
            password: '12345'
          },
          dealer: {
            name: 'Alex'
          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
  describe('#Get All activate dealers', function() {
    it('sAdmin should get dealers', function (done) {
      request
        .post('/dealer/getAllActiveDealers')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
        .expect(200)
        .end(function(err, res) {
          if (err){
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
    it('It should be just active dealers', function (done) {
      request
        .post('/dealer/getAllActiveDealers')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
        .expect(200)
        .end(function(err, res) {
          if (err){
            return done(err);
          }
          for(const dealer of res.body.data){
            if(dealer.user.active === false) {
              return done(new Error('Dealer not active'));
            }
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
    it('No sAdmin should not get dealers', function (done) {
      request
        .post('/dealer/getAllActiveDealers')
        .send()
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
  describe('#Get All dealers', function() {
    it('sAdmin should get dealers', function (done) {
      request
        .post('/dealer/getAllActiveDealers')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
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
    it('No sAdmin should not get dealers', function (done) {
      request
        .post('/dealer/getAllActiveDealers')
        .send()
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
  describe('#Update Dealer', function() {
    it('sAdmin should update dealer', function (done) {
      request
        .post('/dealer/update')
        .send({
          user: {
            id: 6,
            username: 'newDealer',
            password: '12345'
          },
          dealer: {
            name: 'newDealer Updated'
          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.sAdmin})
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
    it('No sAdmin should no update dealer', function (done) {
      request
        .post('/dealer/update')
        .send({
          user: {
            id: 6,
            username: 'alex33',
            password: '12345'
          },
          dealer: {
            name: 'Alex'
          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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

