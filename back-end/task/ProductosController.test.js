var request = require('supertest');
request = request('http://localhost:1337'); //r
describe('ProductosController.getProduct', function() {

  describe('#productoByEan/Plu()', function() {
    it('should get product', function (done) {

      //Structure to compare
      request
        .post('/productos')
        .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
        .send({ codigo: '11111'})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          if(res.body.data)
            done();
          else
            done(new Error("No data"));
        });
    });
  });



});


describe('ProductosController.addMercancia', function() {


  describe('#addMercancia()', function() {
    it('should add product', function (done) {
      request
        .post('/productos/addMercancia')
        .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
        .send({
          productos_zona: `[
			      {"zonas_id":"1","productos_id":"1","epcs_id":"1","devoluciones_id":"1","ventas_id":1}
		        ]`,
          productos_id: 1})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          if(res.body.data)
            done();
          else
            done(new Error("No answer data"));
        });
    });

    //If previous tag (1) was used, must not work anymore
    it('should reject product', function (done) {
      request
        .post('/productos/addMercancia')
        .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
        .send({
          productos_zona: `[
			      {"zonas_id":"1","productos_id":"1","epcs_id":"1","devoluciones_id":"1","ventas_id":1}
		        ]`,
          productos_id: 1})
        .expect(500, done);
    });
  });



});
