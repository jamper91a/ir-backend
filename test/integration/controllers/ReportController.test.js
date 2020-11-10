var request = require('supertest');
request = request('http://localhost:1337');
describe('ReportController', function() {

  describe('#Difference Between Inventories', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/report/difference-between-inventories')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should find not found products', function (done) {
      request
        .post('/report/difference-between-inventories')
        .send({
          firstInventory:1,
          secondInventory:2
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          if(res.body.data.length>0) {
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
          } else {
            done(new Error('Not found products should not be empty'));
          }

        });
    });

  });
  describe('#Save report', function() {
    const url='/report/save-report';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate parameters products', function (done) {
      request
        .post(url)
        .send({
          products: [{product : 1}, {product : 0}, {product : 3}],
          report: {
            firstInventory: 1,
            secondInventory: 2,
            amount: 10,
            units_sell: 10,
            units_returned: 10,
            firstDate: '2020-01-01',
            secondDate: '2020-01-01',
            type: sails.config.custom.REPORT_TYPE.SELL_UNITS,

          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate parameters report', function (done) {
      request
        .post(url)
        .send({
          products: [{product : 1}, {product : 2}, {product : 3}],
          report: "two"
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate parameters report type', function (done) {
      request
        .post(url)
        .send({
          products: [{product : 1}, {product : 2}, {product : 3}],
          report: {
            firstInventory: 1,
            secondInventory: 2,
            amount: 10,
            units_sell: 10,
            units_returned: 10,
            firstDate: '2020-01-01',
            secondDate: '2020-01-01',
            type: 3,

          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate parameters report sell units', function (done) {
      request
        .post(url)
        .send({
          products: [{product : 1}, {product : 2}, {product : 3}],
          report: {
            firstInventory: 1,
            secondInventory: 2,
            amount: 10,
            units_sell: 10,
            units_returned: 10,
            firstDate: '2020-01-01',
            secondDate: null,
            type: sails.config.custom.REPORT_TYPE.SELL_UNITS,

          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate parameters report difference between inventories', function (done) {
      request
        .post(url)
        .send({
          products: [{product : 1}, {product : 2}, {product : 3}],
          report: {
            firstInventory: null,
            secondInventory: 2,
            amount: 10,
            units_sell: 10,
            units_returned: 10,
            firstDate: null,
            secondDate: null,
            type: sails.config.custom.REPORT_TYPE.DIFFERENCE_BETWEEN_INVENTORIES,

          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should save report sell units', function (done) {
      request
        .post(url)
        .send({
          products: [{product : 1}, {product : 2}, {product : 3}],
          report: {
            amount: 10,
            firstDate: '2020-01-01',
            secondDate: '2020-01-01',
            type: sails.config.custom.REPORT_TYPE.SELL_UNITS,
          }
        })
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
    it('Should save report difference between inventories', function (done) {
      request
        .post(url)
        .send({
          products: [{product : 1}, {product : 2}, {product : 3}],
          report: {
            firstInventory: 1,
            secondInventory: 2,
            amount: 10,
            units_sell: 10,
            units_returned: 10,
            type: sails.config.custom.REPORT_TYPE.DIFFERENCE_BETWEEN_INVENTORIES,

          }
        })
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
  });
  describe('#Get reports by type', function() {
    const url='/report/get-reports-by-type';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate parameter type', function (done) {
      request
        .post(url)
        .send({
          type: 332323
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
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
        .send({
          type: 34344
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
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
        .send({
          type: sails.config.custom.REPORT_TYPE.DIFFERENCE_BETWEEN_INVENTORIES
        })
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
  });
  describe('#Get reports by id', function() {
    const url='/report/get-report-by-id';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
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
        .send({id: 1})
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
  });
  describe('#Homologate units', function() {
    const url='/report/homologate-units';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate products', function (done) {
      request
        .post(url)
        .send({products: [{id: 0}]})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not allow admin', function (done) {
      request
        .post(url)
        .send({products: [{id: 0}]})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(403)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not allow manager', function (done) {
      request
        .post(url)
        .send({products: [{id: 0}]})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.manager})
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
        .send({products: [{id: 1}]})
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
  });
  describe('#Sale Units', function() {
    const url='/report/sale-units';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate dates', function (done) {
      request
        .post(url)
        .send({firstDate: 'dadsa', secondDate:'sdsdsd'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
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
        .send({firstDate: '2010-09-01', secondDate:'2019-10-06'})
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
    it('Should allow manager', function (done) {
      request
        .post(url)
        .send({firstDate: '2010-09-01T16:34:56', secondDate:'2019-10-06'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.manager})
        .expect(200)
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
        .send({firstDate: '2010-09-01', secondDate:'2019-10-06T16:34:56'})
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
  });
  describe('#Rotation Units', function() {
    const url='/report/rotation-units';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate dates', function (done) {
      request
        .post(url)
        .send({firstDate: 'dadsa', secondDate:'sdsdsd'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
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
        .send({firstDate: 'dadsa', secondDate:'sdsdsd', employee: {}})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not allow sAdmin', function (done) {
      request
        .post(url)
        .send({firstDate: '2010-09-01', secondDate:'2019-10-06'})
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
    it('Should allow employee', function (done) {
      request
        .post(url)
        .send({firstDate: '2010-09-01', secondDate:'2019-10-06'})
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
    it('Should allow admin', function (done) {
      request
        .post(url)
        .send({firstDate: '2010-09-01', secondDate:'2019-10-06', employee: {shop: {id: 1}}})
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
  describe('#Devolutions By Type', function() {
    const url='/report/devolutions-by-type';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate dates', function (done) {
      request
        .post(url)
        .send({firstDate: 'dadsa', secondDate:'sdsdsd'})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate type', function (done) {
      request
        .post(url)
        .send({firstDate: '2010-09-01', secondDate:'2010-09-01', type: 3})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
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
        .send({firstDate: '2010-09-01', secondDate:'2010-09-01', type: 2, employee: {}})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not allow sAdmin', function (done) {
      request
        .post(url)
        .send({firstDate: '2010-09-01', secondDate:'2019-10-06', type: 1})
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
    it('Should allow employee', function (done) {
      request
        .post(url)
        .send({firstDate: '2010-09-01', secondDate:'2019-10-06', type: 1})
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
    it('Should allow admin', function (done) {
      request
        .post(url)
        .send({firstDate: '2010-09-01', secondDate:'2019-10-06', employee: {shop: {id: 1}}, type: 2})
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
  describe('#Rotation Proyected By Ean/Plu', function() {
    const url='/report/rotation-proyected-by-ean-plu';
    it('Should validate parameters', function (done) {
      request
        .post(url)
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate days', function (done) {
      request
        .post(url)
        .send({days:0})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should validate product', function (done) {
      request
        .post(url)
        .send({days:10, product_id: 0})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should not allow sAdmin', function (done) {
      request
        .post(url)
        .send({days:10, product_id: 1})
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
    it('Should allow employee', function (done) {
      request
        .post(url)
        .send({days:10, product_id: 1})
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
    it('Should allow admin', function (done) {
      request
        .post(url)
        .send({days:10, product_id: 1})
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
  describe('#Difference With Inventory Erp', function() {
    const url='/report/difference-with-inventory-erp';
    it('Should validate employee', function (done) {
      request
        .post(url)
        .send({employee:{}})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            sails.helpers.printTestError(err, res);
            return done(err);
          }
          done();
        });
    });
    it('Should allow employee with parameter', function (done) {
      request
        .post(url)
        .send({
          employee:
            {
              shop: {id: 1},
              company: {id: 1}
            }
        })
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
    it('Should allow employee without parameter', function (done) {
      request
        .post(url)
        .send()
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
    it('Should allow admin', function (done) {
      request
        .post(url)
        .send({
          employee:
            {
              shop: {id: 1},
              company: {id: 1}
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
});

