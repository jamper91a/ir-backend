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
  'POST /productos/findOneByEpc': 'Products.findOneByEpc',
  'POST /productos/findProductInLocalByEanPlu': 'ProductsHasZones.findProductInLocalByEanPlu',
  'POST /productos/findProductInLocalByEpc': 'ProductsHasZones.findProductInLocalByEpc',

  //Usuarios
  'POST /users':'Users.crearEmpleado',
  'POST /sync':'Users.sync',

  //Inventarios
  'POST /inventarios/crear':'Inventories.create',
  'POST /inventarios/consolidar':'Inventories.consolidate',
  'POST /inventarios/listarInventarios':'Inventories.list',
  'POST /inventarios/listarProductosInventario':'Inventories.listProducts',
  'POST /inventarios/adjuntar':'Inventories.attach',

  //InventariosConsolidados
  'POST /inventariosConsolidados/listar':'ConsolidatedInventories.list',
  'POST /inventariosConsolidados/listarTodos':'ConsolidatedInventories.listAll',
  'POST /inventariosConsolidados/listarProductos':'ConsolidatedInventories.listProducts',
  'POST /inventariosConsolidados/ultimoInventario':'ConsolidatedInventories.lastInventory',

  //Inventory Erp
  'POST /inventoryErp/create':'InventoriesErp.create',

  //Transferencias
  'POST /transferencias/crear':'Transfers.create',
  'POST /transferencias/buscar':'Transfers.find',
  'POST /transferencias/listTransfersByType':'Transfers.listTransfersByType',
  'POST /transferencias/listTransfersByShop':'Transfers.listTransfersByShop',
  'POST /transferencias/finishTransfer':'Transfers.finishTransfer',
  
  //Devoluciones
  'POST /devoluciones/devolverProductos':'Devolutions.returnProducts',
  
  //Report
  'POST /reportes/diferenceBetweenInventories': 'Reports.diferenceBetweenInventories',
  'POST /reportes/guardarReporte': 'Reports.saveReport',
  'POST /reportes/getReportsByType': 'Reports.getReportsByType',
  'POST /reportes/homologateUnits': 'Reports.homologateUnits',
  'POST /reportes/getReportById': 'Reports.getReportById',
  'POST /reportes/saleUnits': 'Reports.saleUnits',
  'POST /reportes/rotationUnits': 'Reports.rotationUnits',
  'POST /reportes/devolutionsByType': 'Reports.devolutionsByType',
  'POST /reportes/rotationProyectedByEanPlu': 'Reports.rotationProyectedByEanPlu',
  'POST /reportes/diferenceWithInventoryErp': 'Reports.diferenceWithInventoryErp',

  //Usuarios
  'GET /zonas/listar':'Zonas.listar',

  //Sells
  'POST /sells/create':'Sells.createSell'


};
