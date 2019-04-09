var request = require('supertest');
request = request('http://localhost:1337'); //r
describe('UserController.login', function() {

  describe('#login()', function() {
    it('should return information', function (done) {

      //Structure to compare

      request
        .post('/login')
        .send({ username: 'jamper91', password: '12345' })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});

describe('UserController.sync', function() {

  describe('#sync()', function() {
    it('should return information', function (done) {

      //Structure to compare

      request
        .post('/sync')
        .send({ username: 'jamper91', password: '12345' })
        .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});

