// var request = require('supertest');
// request = request('http://localhost:1337'); //r
// describe('ProductosController', function() {
//
//   describe('#productoByEanPlu', function() {
//     it('should get product 11111', function (done) {
//
//       //Structure to compare
//
//       request
//         .post('/productos')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({ codigo: '11111'})
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data)
//             done();
//           else
//             done(new Error("No data"));
//         });
//     });
//   });
//   describe('#addMercancia()', function() {
//     it('should add Camisas negra', function (done) {
//       request
//         .post('/productos/addMercancia')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({
//           productos_zona: `
//           [
//             {"zonas_id":"1","productos_id":"1","epc":"0036","devoluciones_id":"1","ventas_id":1},
//             {"zonas_id":"1","productos_id":"1","epc":"E20053828213010711909BD1","devoluciones_id":"1","ventas_id":1}
//           ]`,
//           productos_id: 1})
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data)
//             done();
//           else
//             done(new Error("No answer data"));
//         });
//     });
//     it('should add Camisas rosa', function (done) {
//       request
//         .post('/productos/addMercancia')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({
//           productos_zona: `
//           [
//             {"zonas_id":"2","productos_id":"2","epc":"E20053828213011911909C01","devoluciones_id":"1","ventas_id":1},
//             {"zonas_id":"2","productos_id":"2","epc":"E20053828213013412009C3E","devoluciones_id":"1","ventas_id":1}
//           ]`,
//           productos_id: 2})
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data)
//             done();
//           else
//             done(new Error("No answer data"));
//         });
//     });
//     //If previous tag (1) was used, must not work anymore
//     it('should reject product', function (done) {
//       request
//         .post('/productos/addMercancia')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({
//           productos_zona: `[
// 			      {"zonas_id":"1","productos_id":"1","epcs_id":"1","devoluciones_id":"1","ventas_id":1}
// 		        ]`,
//           productos_id: 1})
//         .expect(500, done);
//     });
//   });
//
//
//
// });
//
// describe('Inventarios', function() {
//
//   describe('#inventarioParcial', function() {
//     it('deberia crear inventario parcial en Bodega ', function (done) {
//       request
//         .post('/inventarios/crear')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .set('Content-Type', 'application/json')
//         .send({
//           inventario_productos:[
//             {zonas_id:1, productos_zona_id:1, productos_epcs_id:1},
//             ],
//           inventario:{
//             parcial: true,
//             colaborativo: false,
//             zonas_id: 1,
//             inventarios_consolidados_id:1
//           }
//         })
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data){
//             if(!res.body.data.inventarios)
//               done(new Error("Error inventario creado"));
//             if(!res.body.data.users_inventarios)
//               done(new Error("Error users_inventarios creado"));
//             if(!res.body.data.inventario_productos)
//               done(new Error("Error inventario_productos creado"));
//             else if(res.body.data.inventario_productos.length!=1)
//               done(new Error("Productos asociados al inventarios deben ser dos"));
//
//             done();
//           }else{
//             done(new Error("No retorna informacion"));
//           }
//
//         });
//     });
//     // it('negar crear inventario parcial en Bodega ', function (done) {
//     //   request
//     //     .post('/inventarios/crear')
//     //     .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//     //     .set('Content-Type', 'application/json')
//     //     .send({
//     //       inventario_productos:[
//     //         {zonas_id:1, productos_zona_id:1, productos_epcs_id:1},
//     //       ],
//     //       inventario:{
//     //         parcial: true,
//     //         colaborativo: false,
//     //         zonas_id: 1,
//     //         inventarios_consolidados_id:1
//     //       }
//     //     })
//     //     .expect(500, done)
//     // });
//     // it('negar crear inventario parcial en Almacen debido a que el producto no pertenece a la zona', function (done) {
//     //   request
//     //     .post('/inventarios/crear')
//     //     .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//     //     .set('Content-Type', 'application/json')
//     //     .send({
//     //       inventario_productos:[
//     //         {zonas_id:1, productos_zona_id:2, productos_epcs_id:2}
//     //         ],
//     //       inventario:{
//     //         parcial: true,
//     //         colaborativo: false,
//     //         zonas_id: 2,
//     //         inventarios_consolidados_id:1
//     //       }
//     //     })
//     //     .expect(500, done);
//     // });
//     it('deberia crear inventario parcial en Almacen', function (done) {
//       request
//         .post('/inventarios/crear')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .set('Content-Type', 'application/json')
//         .send({
//           inventario_productos:[
//             {zonas_id:2, productos_zona_id:3, productos_epcs_id:3}
//           ],
//           inventario:{
//             parcial: true,
//             colaborativo: false,
//             zonas_id: 2,
//             inventarios_consolidados_id:1
//           }
//         })
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data){
//             if(!res.body.data.inventarios)
//               done(new Error("Error inventario creado"));
//             if(!res.body.data.users_inventarios)
//               done(new Error("Error users_inventarios creado"));
//             if(!res.body.data.inventario_productos)
//               done(new Error("Error inventario_productos creado"));
//             else if(res.body.data.inventario_productos.length!=1)
//               done(new Error("Productos asociados al inventarios deben ser dos"));
//
//             done();
//           }else{
//             done(new Error("No retorna informacion"));
//           }
//
//         });
//     });
//     it('deberia listar  2 inventario parciales por Zonas', function (done) {
//       request
//         .post('/inventarios/listarInventarios')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({
//           tipo: "all",
//           colaborativo: 0
//         })
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data){
//             if(res.body.data.length!=2)
//               done(new Error("Error deberia retornar 1 inventario"));
//
//             done();
//           }else{
//             done(new Error("No retorna informacion"));
//           }
//
//         });
//     });
//     it('deberia listar  2 inventario parciales por consolidar', function (done) {
//       request
//         .post('/inventarios/listarInventarios')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({
//           tipo: "no_consolidado",
//           colaborativo: 0
//         })
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data){
//             if(res.body.data.length!=2)
//               done(new Error("Error deberia retornar 1 inventario"));
//
//             done();
//           }else{
//             done(new Error("No retorna informacion"));
//           }
//
//         });
//     });
//     it('deberia consolidar inventario parciales', function (done) {
//       request
//         .post('/inventarios/consolidar')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .set('Content-Type', 'application/json')
//         .send({
//           inventarios_id: [1,2],
//           name: "Bodega / Almacen"
//         })
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data){
//             if(res.body.data.inventarios.length!=2)
//               done(new Error("Error deberia retornar 2 inventario"));
//             if(!res.body.data.inventarios_consolidados)
//               done(new Error("Error deberia retornar 1 inventario consolidados"));
//
//             done();
//           }else{
//             done(new Error("No retorna informacion"));
//           }
//
//         });
//     });
//     it('deberia listar 0 inventario parciales por consolidar', function (done) {
//       request
//         .post('/inventarios/listarInventarios')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({
//           tipo: "no_consolidado",
//           colaborativo: 0
//         })
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data){
//             if(res.body.data.length!=0)
//               done(new Error("Error deberia retornar 0 inventario"));
//
//             done();
//           }else{
//             done(new Error("No retorna informacion"));
//           }
//
//         });
//     });
//     it('deberia listar  2 inventario parciales por Zonas', function (done) {
//       request
//         .post('/inventarios/listarInventarios')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({
//           tipo: "all",
//           colaborativo: 0
//         })
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data){
//             if(res.body.data.length!=2)
//               done(new Error("Error deberia retornar 1 inventario"));
//
//             done();
//           }else{
//             done(new Error("No retorna informacion"));
//           }
//
//         });
//     });
//     it('deberia listar 1 inventario consolidado', function (done) {
//       request
//         .post('/inventariosConsolidados/listar')
//         .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//         .send({
//           colaborativo: 0
//         })
//         .expect(200)
//         .end(function(err, res) {
//           if (err) return done(err);
//           if(res.body.data){
//             if(res.body.data.length!=1)
//               done(new Error("no retorno 1 inventario consolidado: "+res.body.data.length));
//
//             done();
//           }else{
//             done(new Error("No retorna informacion"));
//           }
//
//         });
//     });
//   });
//
//   //
// });
// describe('#inventarioColaborativo', function() {
//   it('deberia crear inventario colaborativo en Bodega ', function (done) {
//     request
//       .post('/inventarios/crear')
//       .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//       .set('Content-Type', 'application/json')
//       .send({
//         inventario_productos:[
//           {zonas_id:1, productos_zona_id:2, productos_epcs_id:2},
//         ],
//         inventario:{
//           parcial: false,
//           colaborativo: true,
//           zonas_id: 1,
//           inventarios_consolidados_id:1
//         }
//       })
//       .expect(200)
//       .end(function(err, res) {
//         if (err) return done(err);
//         if(res.body.data){
//           if(!res.body.data.inventarios)
//             done(new Error("Error inventario creado"));
//           if(!res.body.data.users_inventarios)
//             done(new Error("Error users_inventarios creado"));
//           if(!res.body.data.inventario_productos)
//             done(new Error("Error inventario_productos creado"));
//           else if(res.body.data.inventario_productos.length!=1)
//             done(new Error("Productos asociados al inventarios deben ser dos"));
//
//           done();
//         }else{
//           done(new Error("No retorna informacion"));
//         }
//
//       });
//   });
//   // it('negar crear inventario parcial en Bodega ', function (done) {
//   //   request
//   //     .post('/inventarios/crear')
//   //     .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//   //     .set('Content-Type', 'application/json')
//   //     .send({
//   //       inventario_productos:[
//   //         {zonas_id:1, productos_zona_id:1, productos_epcs_id:1},
//   //       ],
//   //       inventario:{
//   //         parcial: true,
//   //         colaborativo: false,
//   //         zonas_id: 1,
//   //         inventarios_consolidados_id:1
//   //       }
//   //     })
//   //     .expect(500, done)
//   // });
//   // it('negar crear inventario parcial en Almacen debido a que el producto no pertenece a la zona', function (done) {
//   //   request
//   //     .post('/inventarios/crear')
//   //     .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//   //     .set('Content-Type', 'application/json')
//   //     .send({
//   //       inventario_productos:[
//   //         {zonas_id:1, productos_zona_id:2, productos_epcs_id:2}
//   //         ],
//   //       inventario:{
//   //         parcial: true,
//   //         colaborativo: false,
//   //         zonas_id: 2,
//   //         inventarios_consolidados_id:1
//   //       }
//   //     })
//   //     .expect(500, done);
//   // });
//   it('deberia crear inventario colaborativo en Almacen', function (done) {
//     request
//       .post('/inventarios/crear')
//       .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//       .set('Content-Type', 'application/json')
//       .send({
//         inventario_productos:[
//           {zonas_id:2, productos_zona_id:4, productos_epcs_id:4}
//         ],
//         inventario:{
//           parcial: false,
//           colaborativo: true,
//           zonas_id: 2,
//           inventarios_consolidados_id:1
//         }
//       })
//       .expect(200)
//       .end(function(err, res) {
//         if (err) return done(err);
//         if(res.body.data){
//           if(!res.body.data.inventarios)
//             done(new Error("Error inventario creado"));
//           if(!res.body.data.users_inventarios)
//             done(new Error("Error users_inventarios creado"));
//           if(!res.body.data.inventario_productos)
//             done(new Error("Error inventario_productos creado"));
//           else if(res.body.data.inventario_productos.length!=1)
//             done(new Error("Productos asociados al inventarios deben ser dos"));
//
//           done();
//         }else{
//           done(new Error("No retorna informacion"));
//         }
//
//       });
//   });
//   it('deberia listar  2 inventario colaborativo por consolidar', function (done) {
//     request
//       .post('/inventarios/listarInventarios')
//       .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//       .send({
//         tipo: "no_consolidado",
//         colaborativo: 1
//       })
//       .expect(200)
//       .end(function(err, res) {
//         if (err) return done(err);
//         if(res.body.data){
//           if(res.body.data.length!=2)
//             done(new Error("Error deberia retornar 1 inventario"));
//
//           done();
//         }else{
//           done(new Error("No retorna informacion"));
//         }
//
//       });
//   });
//   it('deberia consolidar inventario parciales', function (done) {
//     request
//       .post('/inventarios/consolidar')
//       .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//       .set('Content-Type', 'application/json')
//       .send({
//         inventarios_id: [3,4],
//         name: "Bodega / Almacen / Consolidado"
//       })
//       .expect(200)
//       .end(function(err, res) {
//         if (err) return done(err);
//         if(res.body.data){
//           if(res.body.data.inventarios.length!=2)
//             done(new Error("Error deberia retornar 2 inventario"));
//           if(!res.body.data.inventarios_consolidados)
//             done(new Error("Error deberia retornar 1 inventario consolidados"));
//
//           done();
//         }else{
//           done(new Error("No retorna informacion"));
//         }
//
//       });
//   });
//   it('deberia listar 0 inventario colaborativo por consolidar', function (done) {
//     request
//       .post('/inventarios/listarInventarios')
//       .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//       .send({
//         tipo: "no_consolidado",
//         colaborativo: 1
//       })
//       .expect(200)
//       .end(function(err, res) {
//         if (err) return done(err);
//         if(res.body.data){
//           if(res.body.data.length!=0)
//             done(new Error("Error deberia retornar 0 inventario"));
//
//           done();
//         }else{
//           done(new Error("No retorna informacion"));
//         }
//
//       });
//   });
//   it('deberia listar 1 inventario colaborativo consolidado', function (done) {
//     request
//       .post('/inventariosConsolidados/listar')
//       .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsZWFkb19pZCI6MSwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJqYW1wZXI5MSIsImNvbXBhbnlfaWQiOjEsImxvY2FsZXNfaWQiOjEsImlhdCI6MTU0MTIwMDUzMH0.DutQTEv0HLcWajtxA2dwRED_RNESJVSE9nSyrcfzPmA"})
//       .send({
//         colaborativo: 1
//       })
//       .expect(200)
//       .end(function(err, res) {
//         if (err) return done(err);
//         if(res.body.data){
//           if(res.body.data.length!=1)
//             done(new Error("no retorno 1 inventario consolidado: "+res.body.data.length));
//
//           done();
//         }else{
//           done(new Error("No retorna informacion"));
//         }
//
//       });
//   });
// });
