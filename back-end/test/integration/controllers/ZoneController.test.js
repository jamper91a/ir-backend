var request = require('supertest');
request = request('http://localhost:1337');
describe('ZoneController', function() {
  describe('#List zones by shop', function() {
    const url='/zone/list-zones-by-shop';
    it('Should not allow no admin users', function (done) {
      request
        .post(url)
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

