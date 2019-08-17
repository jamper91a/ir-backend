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
  'POST /productos/findProductInLocalByEanPlu': 'ProductosZona.findProductInLocalByEanPlu',

  //Usuarios
  'POST /users':'Users.crearEmpleado',
  'POST /sync':'Users.sync',

  //Inventarios
  'POST /inventarios/crear':'Inventarios.crear',
  'POST /inventarios/consolidar':'Inventarios.consolidar',
  'POST /inventarios/listarInventarios':'Inventarios.listar',
  'POST /inventarios/listarProductosInventario':'Inventarios.listarProductos',
  'POST /inventarios/listarProductosInventariosColaborativos':'Inventarios.listarProductosInventariosColaborativos',
  'POST /inventarios/adjuntar':'Inventarios.adjuntar',

  //InventariosConsolidados
  'POST /inventariosConsolidados/listar':'ConsolidatedInventories.list',
  'POST /inventariosConsolidados/listarTodos':'InventariosConsolidados.listarTodos',
  'POST /inventariosConsolidados/listarProductos':'InventariosConsolidados.listarProductos',
  'POST /inventariosConsolidados/ultimoInventario':'InventariosConsolidados.ultimoInventario',


  //Transferencias
  'POST /transferencias/crear':'Transferencias.crear',
  'POST /transferencias/buscar':'Transferencias.buscar',
  'POST /transferencias/obtenerTransferencia':'Transferencias.obtenerTransferencia',
  'POST /transferencias/obtenerTransferencias':'Transferencias.obtenerTransferencias',
  'POST /transferencias/finalizarTransferencia':'Transferencias.finalizarTransferencia',
  
  //Devoluciones
  'POST /devoluciones/devolverProductos':'Devoluciones.devolverProductos',
  
  //Reportes
  'POST /reportes/diferenceBetweenInventories': 'Reportes.diferenceBetweenInventories',
  'POST /reportes/guardarReporte': 'Reportes.guardarReporte',

  //Usuarios
  'GET /zonas/listar':'Zonas.listar',


};
