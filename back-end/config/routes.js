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


  'POST /login': 'Users.login',
  '/logout': 'Users.logout',

  //Mercancia
  'POST /productos/addMercancia': 'ProductsHasZones.addCommodity',
  'POST /productos/findOne': 'Products.findOne',
  'POST /productos/findProductInLocalByEanPlu': 'ProductsHasZones.findProductInLocalByEanPlu',

  //Usuarios
  'POST /users':'Users.crearEmpleado',
  'POST /sync':'Users.sync',

  //Inventarios
  'POST /inventarios/crear':'Inventories.create',
  'POST /inventarios/consolidar':'Inventories.consolidate',
  'POST /inventarios/listarInventarios':'Inventories.list',
  'POST /inventarios/listarProductosInventario':'Inventories.listProducts',
  // 'POST /inventarios/listarProductosInventariosColaborativos':'Inventories.listarProductosInventariosColaborativos',
  'POST /inventarios/adjuntar':'Inventories.attach',

  //InventariosConsolidados
  'POST /inventariosConsolidados/listar':'ConsolidatedInventories.list',
  'POST /inventariosConsolidados/listarTodos':'ConsolidatedInventories.listAll',
  'POST /inventariosConsolidados/listarProductos':'ConsolidatedInventories.listProducts',
  'POST /inventariosConsolidados/ultimoInventario':'ConsolidatedInventories.lastInventory',


  //Transferencias
  'POST /transferencias/crear':'Transferencias.crear',
  'POST /transferencias/buscar':'Transferencias.buscar',
  'POST /transferencias/obtenerTransferencia':'Transferencias.obtenerTransferencia',
  'POST /transferencias/obtenerTransferencias':'Transferencias.obtenerTransferencias',
  'POST /transferencias/finalizarTransferencia':'Transferencias.finalizarTransferencia',
  
  //Devoluciones
  'POST /devoluciones/devolverProductos':'Devolutions.devolverProductos',
  
  //Reportes
  'POST /reportes/diferenceBetweenInventories': 'Reportes.diferenceBetweenInventories',
  'POST /reportes/guardarReporte': 'Reportes.guardarReporte',

  //Usuarios
  'GET /zonas/listar':'Zonas.listar',


};
