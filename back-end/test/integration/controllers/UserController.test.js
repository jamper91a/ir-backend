var request = require('supertest');
request = request('http://localhost:1337');
describe('UserController', function() {
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
  describe('#Create admin', function() {
    const url='/user/create-admin';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
            user: {password: 'newpassword', username: 'newUser'},
            employee: {company: 0, shop: {}}
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate employee company name', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {company: { name: ''}}
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not allow no dealer users', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {company: { name: 'New company'}}
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
    it('Should allow dealer users', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUserAdmin', group: 3},
            employee: {company: { name: 'New company'}}
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
  describe('#User login', function() {
    const url='/user/login';
    it('should return information', function (done) {
      request
        .post(url)
        .send({ username: 'cajero@ir.com', password: '12345' })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          if(res.body.data && _.isObject(res.body.data.employee) && _.isObject(res.body.data.employee.company) &&
            _.isObject(res.body.data.employee.user) && _.isObject(res.body.data.employee.shop) && _.isString(res.body.data.token)
          ) {
            done();
          } else{
            done ('No valid data');
          }

        });
    });
  });
  describe('#User login web', function() {
    const url='/user/login-web';
    it('should return information about dealer', function (done) {
      request
        .post(url)
        .send({ username: 'dealer@ir.com', password: '12345' })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          if(res.body.data && _.isObject(res.body.data.user) && _.isObject(res.body.data.dealer) &&
            _.isBoolean(res.body.data.employee) && res.body.data.employee === false && _.isString(res.body.data.token)
          ) {
            done();
          } else{
            done (new Error('No valid data'));
          }

        });
    });
    it('should return information about sAdmin', function (done) {
      request
        .post(url)
        .send({ username: 'superAdmin', password: '12345' })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          if(res.body.data && _.isObject(res.body.data.user)  &&
            _.isBoolean(res.body.data.employee) && res.body.data.employee === false  && _.isString(res.body.data.token)
          ) {
            done();
          } else{
            done ('No valid data');
          }

        });
    });
    it('should return information about admin', function (done) {
      request
        .post(url)
        .send({ username: 'gerente@ir.com', password: '12345' })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          if(
            res.body.data &&
            _.isObject(res.body.data.user) &&
            _.isObject(res.body.data.employee) &&  _.isObject(res.body.data.employee.company) && _.isObject(res.body.data.employee.user) && _.isObject(res.body.data.employee.shop) &&
            _.isString(res.body.data.token)
          ) {
            done();
          } else{
            done ('No valid data');
          }

        });
    });
    it('should not allow employee', function (done) {
      request
        .post(url)
        .send({ username: 'cajero@ir.com', password: '12345' })
        .expect(403)
        .end(function(err, res) {
          if (err) return done(err);
            done();
        });
    });
  });
  describe('#Sync', function() {
    const url='/user/sync';
    it('Should return data', function (done) {
      request
        .post(url)
        .send({ page: 1 })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          const epcs = res.body.data.epcs;
          const products = res.body.data.products;
          const productsHasZones = res.body.data.productsHasZones;
          const zones = res.body.data.zones;
          const shops = res.body.data.shops;
          const devolutions = res.body.data.devolutions;
          const page = res.body.data.page;
          if(
            _.isArray(epcs) &&
            _.isArray(products) &&
            _.isArray(productsHasZones) &&
            _.isArray(zones) &&
            _.isArray(shops) &&
            _.isArray(devolutions) &&
            _.isNumber(page)
          ) {
            done();
          } else{
            done (new Error('No valid data'));
          }

        });
    });
  });
  describe('#Update admin', function() {
    const url='/user/update-admin';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
            user: {password: 'newpassword', username: 'newUser'},
            employee: {company: 0, shop: {}}
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate employee company name', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {company: { name: ''}}
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not allow no dealer users', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword', username: 'newUser', group: 3},
            employee: {company: { name: 'New company'}}
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
    it('Should allow dealer users', function (done) {
      request
        .post(url)
        .send(
          {
            user: {password: 'newpassword3', username: 'newUserAdmin', group: 3},
            employee: {company: { name: 'New company 2'}}
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
  describe('#Find Employee by Username', function() {
    const url='/user/find-employee-by-username';
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
        .send({ username: ''})
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
    it('Should no find user', function (done) {
      request
        .post(url)
        .send(
          {
            username: 'cajero2@ir.com'
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'userNoFound') {
            done();
          } else {
            done('Should not found user')
          }
        });
    });
    it('Should no find employee', function (done) {
      request
        .post(url)
        .send(
          {
            username: 'superAdmin'
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'employeeNoFound') {
            done();
          } else {
            done('Should not found employee')
          }
        });
    });
    it('Should no allow non admin users', function (done) {
      request
        .post(url)
        .send(
          {
            username: 'cajero@ir.com'
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
    it('Should return data', function (done) {
      request
        .post(url)
        .send(
          {
            username: 'cajero@ir.com'
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

