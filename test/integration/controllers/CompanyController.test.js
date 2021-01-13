var request = require('supertest');
request = request('http://localhost:1337'); //r
describe('Company', function() {

  //Log

  describe('#GetCompaniesByDealer', function() {
    it('Just dealer should see companies created', function (done) {
      request
        .post('/company/getCompaniesByDealer')
        .send({})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(200)
        .end(async function(err, res) {
          if (err){
            printError(res);
            return done(err);
          }
          //Validate format
          if(res.headers['content-type'].includes('application/json')) {
            try {
              await sails.helpers.validation.responses.validateCompaniesByDealer(res.body);
              request
                .post('/company/getCompaniesByDealer')
                .send({})
                .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
                .expect(403)
                .end(function(err, res) {
                  if (err){
                    printError(res);
                    return done(err);
                  }
                  done();
                });
            } catch (e) {
              console.error(e);
              done(new Error('No valid Json'));
            }
          } else {
            done(new Error('No valid Json format'));
          }



        });
    });
  });

  describe('#GetCompanyById', function() {
    it('Manager should see the company', function (done) {
      request
        .post('/company/getCompanyById')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.manager})
        .expect(200)
        .end(function(err, res) {

          if (err){
            printError(res);
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
    it('Dealer should see the company', function (done) {
      request
        .post('/company/getCompanyById')
        .send({id:1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(200)
        .end(function(err, res) {

          if (err){
            printError(res);
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
    it('Admin should see the company', function (done) {
      request
        .post('/company/getCompanyById')
        .send({id:1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(200)
        .end(function(err, res) {

          if (err){
            printError(res);
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
    it('Employees should not see the company', function (done) {
      request
        .post('/company/getCompanyById')
        .send({id:1})
        .set({Authorization: "Bearer " + sails.config.custom.tokens.cashier})
        .expect(403)
        .end(function(err, res) {
          if (err){
            return done(err);
          }
           done();
        });

    });
  });

  describe('#GetEmployeesByAdmin', function() {
    it('Admin should get employees', function (done) {
      request
        .post('/company/getEmployeesByAdmin')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.admin})
        .expect(200)
        .end(function(err, res) {

          if (err){
            printError(res);
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
    it('Cashier should not get the employees', function (done) {
      request
        .post('/company/getEmployeesByAdmin')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.cashier})
        .expect(403)
        .end(function(err, res) {

          if (err){
            printError(res);
            return done(err);
          }
          done();
        });
    });
    it('Dealer should not get the employees', function (done) {
      request
        .post('/company/getEmployeesByAdmin')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.dealer})
        .expect(403)
        .end(function(err, res) {

          if (err){
            printError(res);
            return done(err);
          }
          done();
        });
    });
    it('Employee should not get the employees', function (done) {
      request
        .post('/company/getEmployeesByAdmin')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(403)
        .end(function(err, res) {

          if (err){
            printError(res);
            return done(err);
          }
          done();
        });
    }
    );
  });

  describe('#Update', function() {
    it('Admin should update company', function (done) {

      //Login as admin
      let token = '';
      request
        .post('/user/login-web')
        .send({ username: 'gerente@ir.com', password: '12345' })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          token =res.body.data.token;
          request
            .post('/company/update')
            .field('withPhoto','true')
            .attach('photo', 'test/files/chat1.png')
            .set({Authorization: "Bearer " + token})
            .expect(200)
            .end(function(err, res) {
              if (err){
                printError(res);
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
});


function printError(res) {
  sails.log.error(res.res.headers['x-exit']);
  sails.log.error(res.res.headers['x-exit-description']);
  sails.log.error(res.body);

}

