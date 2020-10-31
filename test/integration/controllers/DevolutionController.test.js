var request = require('supertest');
request = request('http://localhost:1337');
describe('DevolutionController', function() {

  describe('#return-product', function() {
    it('Should pass', function (done) {
      request
        .post('/devolution/returnProducts')
        .send({
          products: [
            {
              id: 1,
              zone: 1,
              product: 1,
              epc: 1,
              notes_return: 'ok',
              devolution: 1
            },
            {
              id: 1,
              zone: 1,
              product: 1,
              epc: 1,
              notes_return: 'ok',
              devolution: 1
            },
            {
              id: 1,
              zone: 1,
              product: 1,
              epc: 1,
              notes_return: 'ok',
              devolution: 1
            }
          ]
        })
        .set({Authorization: "Bearer " + sails.config.custom.tokens.employee})
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
  });
});

