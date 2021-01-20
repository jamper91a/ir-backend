var request = require('supertest');
request = request('http://localhost:1338');
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
            user: {password: 'newpassword', rpassword: 'newpassword', name: 'new name', username: 'newUser', group: 3},
            employee: {company: 1, shop: 1}
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
            user: {password: '12345', username: 'newUserAdmin', group: 3},
            employee: {company: { name: 'New company'}}
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
    const urlUpdateShop='/shop/update-shop';
    it('Should not allow to update a shop of a different company', function (done) {
      request
        .post(urlUpdateShop)
        .send({
          name: 'My shop updated',
          id: 4
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(403)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'shopNoValid') {
            done();
          } else {
            done('Should not allow update a shop from another company')
          }
        });
    });
    const urlUpdateSupplier='/supplier/update-supplier';
    it('Should not allow to update a supplier of a different company', function (done) {
      request
        .post(urlUpdateSupplier)
        .send({
          name: 'My supplier updated',
          id: 14
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin2})
        .expect(403)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.res.headers['x-exit'] === 'supplierNotValid') {
             done();
          } else {
            done(new Error('Should not allow update a shop from another company'))
          }
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
        .send({ page: 0 })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.cashier})
        .expect(200)
        .end(async function(err, res) {
          if (err) return done(err);
          if(res.headers['content-type'].includes('application/json')) {
            console.log(res.body);
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
              try{
                //Validate the epcs
                const allEpcs = await sails.helpers.validation.validateEpcs(epcs);
                const allProducts = await sails.helpers.validation.validateProducts(products);
                const allProductsHasZones = await sails.helpers.validation.validateProductsHasZones(productsHasZones);
                const allZones = await sails.helpers.validation.validateZones(zones);
                const allShops = await sails.helpers.validation.validateShops(shops);
                const allDevolutions = await sails.helpers.validation.validateDevolutions(devolutions);
                if(allEpcs && allProducts && allProductsHasZones && allZones && allShops && allDevolutions) {
                  JSON.parse(JSON.stringify(res.body));
                  done();
                } else {
                  console.log('allEpcs', allEpcs);
                  console.log('allProducts', allProducts);
                  console.log('allProductsHasZones', allProductsHasZones);
                  console.log('allZones', allZones);
                  console.log('allShops', allShops);
                  console.log('allDevolutions', allDevolutions);
                  done (new Error('No valid format for the response'));
                }



              } catch (e) {
                console.error(e);
                return done(e);
              }
            } else{
              done (new Error('No valid data'));
            }
          } else {
            done(new Error('No valid Json format'));
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
            user: {password: '12345', rpassword:'12345', username: 'newUserAdmin', group: 3},
            employee: {company: { name: 'New company 2'}}
          })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
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
  describe('#Find Employee by id', function() {
    const url='/user/find-employee-by-id';
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
    it('Should validate id', function (done) {
      request
        .post(url)
        .send({ id: ''})
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
    it('Should no find employee', function (done) {
      request
        .post(url)
        .send(
          {
            id: 0
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
    it('Should no return data', function (done) {
      request
        .post(url)
        .send(
          {
            id: 1,
            companyId: -1
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
    it('Should return data', function (done) {
      request
        .post(url)
        .send(
          {
            id: 1
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
  describe('#Update Employee by Username', function() {
    const url='/user/modify-employee-by-username';
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
    it('Should validate group', function (done) {
      request
        .post(url)
        .send({
          user: {
            username: 'test',
            password: 'test',
            rpassword: 'test',
            name: 'test',
            active: true,
            group: 1,
          },
          employee: {
            shop: 1
          }
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
    it('Should validate passwords', function (done) {
      request
        .post(url)
        .send({
          user: {
            username: 'test',
            password: 'test',
            rpassword: '2',
            name: 'test',
            active: true,
            group: 3,
          },
          employee: {
            shop: 1
          }
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
    it('Should validate company', function (done) {
      request
        .post(url)
        .send({
          user: {
            username: 'test',
            password: 'test',
            rpassword: 'test',
            name: 'test',
            active: true,
            group: 3,
          },
          employee: {
            shop: 1,
            company: 1
          }
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
    it('Should no find user', function (done) {
      request
        .post(url)
        .send({
          user: {
            username: 'test',
            password: 'test',
            rpassword: 'test',
            name: 'test',
            active: true,
            group: 3,
          },
          employee: {
            shop: 1
          }
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
    it('Should no allow non admin users', function (done) {
      request
        .post(url)
        .send({
          user: {
            username: 'newUser',
            password: 'newUser',
            rpassword: 'newUser',
            name: 'newUser updated',
            active: true,
            group: 3,
          },
          employee: {
            shop: 1
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
    it('Should allow admin', function (done) {
      request
        .post(url)
        .send({
          user: {
            username: 'newUser',
            password: 'newUser',
            rpassword: 'newUser',
            name: 'newUser updated',
            active: true,
            group: 3,
          },
          employee: {
            shop: 1
          }
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
    it('Should allow admin without users password', function (done) {
      request
        .post(url)
        .send({
          user: {
            username: 'newUser',
            name: 'newUser updated 3',
            active: true,
            group: 3,
          },
          employee: {
            shop: 1
          }
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
  describe('#List Employees by Company', function() {
    const url='/user/list-employees-by-company';
    it('Should no allow non admin users', function (done) {
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
    it('Should allow admin', function (done) {
      request
        .post(url)
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
  describe('#Change Employee State', function() {
    const url='/user/change-employee-state';
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
    it('Should validate active', function (done) {
      request
        .post(url)
        .send({ username: 'jose', active: 2})
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
    it('Should no allow non admin users', function (done) {
      request
        .post(url)
        .send({ username: 'jose', active: false})
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
        .send({ username: 'newUser', active: false})
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


