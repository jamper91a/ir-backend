var request = require('supertest');
request = request('http://localhost:1337'); //r
describe('UserController.login', function() {
  describe('#Create employee', function() {
    const url='/user/create-employee';
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
    it('Should validate username', function (done) {
      request
        .post(url)
        .send({user: {password: '', username: '', group: 1}})
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
    it('Should validate password', function (done) {
      request
        .post(url)
        .send({user: {password: '', username: 'newUser', group: 1}})
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
    it('Should validate group', function (done) {
      request
        .post(url)
        .send({user: {password: 'newpassword', username: 'newUser', group: 1}})
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
    it('Should validate employee', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {}
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
    it('Should validate employee company', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {company: 0, shop: {}}
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
    it('Should validate employee company shop', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {company: 1, shop: 0}
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
    it('Should not allow no admin users', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {company: 1, shop: 1}
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
    it('Should allow admin users', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {company: 1, shop: 1}
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
  });
  describe('#login()', function() {
    it('should return information', function (done) {

      //Structure to compare

      request
        .post('/login')
        .send({ username: 'cajero@ir.com', password: '12345' })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });


});

// describe('UserController.sync', function() {
//
//   describe('#sync()', function() {
//     it('should return information', function (done) {
//
//       //Structure to compare
//
//       request
//         .post('/sync')
//         .send({ username: 'jamper91', password: '12345' })
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           done();
//         });
//     });
//   });
// });

