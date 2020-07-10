var request = require('supertest');
request = request('http://localhost:1337');
describe('PdfController', function() {

  describe('#Create pdf', function() {
    it('Should validate parameters', function (done) {
      request
        .post('/pdf/createPdf')
        .send()
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            // console.log(err);
            return done(err);
          }
          done();
        });
    });
    it('Should create pdf', function (done) {
      //Try to create the inventory
      request
        .post('/pdf/createPdf')
        .send({
          templateId: 63425,
          data: {
            title: 'Total Report',
            header: [
              {
                col1: 'Total',
                col2: 'EPC',
                col3: 'Description'
              }
            ],
            rows: [
              {
                total: 10,
                EPC: '123564321',
                description: 'Camisa negra'
              },
              {
                total: 100,
                EPC: '123564321',
                description: 'Camisa zul'
              },
              {
                total: 90,
                EPC: '123564321',
                description: 'Camisa verde'
              },
              {
                total: 32,
                EPC: '123564321',
                description: 'Camisa naranja'
              }
            ]
          }
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
    it('Should validate email', function (done) {
      //Try to create the inventory
      request
        .post('/pdf/createPdf')
        .send({
          templateId: 63425,
          data: {
            title: 'Total Report',
            header: [
              {
                col1: 'Total',
                col2: 'EPC',
                col3: 'Description'
              }
            ],
            rows: [
              {
                total: 10,
                EPC: '123564321',
                description: 'Camisa negra'
              },
              {
                total: 100,
                EPC: '123564321',
                description: 'Camisa zul'
              },
              {
                total: 90,
                EPC: '123564321',
                description: 'Camisa verde'
              },
              {
                total: 32,
                EPC: '123564321',
                description: 'Camisa naranja'
              }
            ]
          },
          to: 'jose'
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(400)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
    it('Should send email', function (done) {
      //Try to create the inventory
      request
        .post('/pdf/createPdf')
        .send({
          templateId: 63425,
          data: {
            title: 'Total Report',
            header: [
              {
                col1: 'Total',
                col2: 'EPC',
                col3: 'Description'
              }
            ],
            rows: [
              {
                total: 10,
                EPC: '123564321',
                description: 'Camisa negra'
              },
              {
                total: 100,
                EPC: '123564321',
                description: 'Camisa zul'
              },
              {
                total: 90,
                EPC: '123564321',
                description: 'Camisa verde'
              },
              {
                total: 32,
                EPC: '123564321',
                description: 'Camisa naranja'
              }
            ]
          },
          to: 'jamper91@hotmail.com'
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
  });
});

