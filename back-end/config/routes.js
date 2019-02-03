/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /':{
    view: 'pages/homepage'
  },

  'POST /login': 'Users.login',
  '/logout': 'Users.logout',

  //Mercancia
  'POST /productos/addMercancia': 'ProductosZona.addMercancia',
  'POST /productos': 'Productos.get',

  //Usuarios
  'POST /users':'Users.crearEmpleado',

  //Inventarios
  'POST /inventarios/crear':'Inventarios.crear',
  'POST /inventarios/consolidar':'Inventarios.consolidar',
  'POST /inventarios/listarInventarios':'Inventarios.listar',
  'POST /inventarios/listarProductosInventario':'Inventarios.listarProductos',


  //Transferencias
  'POST /transferencias/crear':'Transferencias.crear',
  'POST /transferencias/buscar':'Transferencias.buscar',
  'POST /transferencias/obtenerTransferencias':'Transferencias.obtenerTransferencias',


};
