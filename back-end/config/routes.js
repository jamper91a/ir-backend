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


  //Companies
  'POST /companies/getCompaniesByDealer':'Companies.getCompaniesByDealer',
  'POST /companies/getCompaniesById':'Companies.getCompaniesById',
  'POST /companies/update':'Companies.update',

  //Dealers
  'POST /dealers/getAllDealers':'Dealers.getAllDealers',
  'POST /dealers/create':'Dealers.create',
  'POST /dealers/update':'Dealers.update',
  'POST /dealers/getAllActiveDealers':'Dealers.getAllActiveDealers',

  
  //Devoluciones
  'POST /devoluciones/devolverProductos':'Devolutions.returnProducts',

  //Epc
  'POST /epcs/create':'Epcs.create',
  'POST /epcs/tagsByDealerByMonth':'Epcs.tagsByDealerByMonth',
  'POST /epcs/tagsByCompanyByMonth':'Epcs.tagsByCompanyByMonth',

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

  //Login
  'POST /login': 'Users.login',
  'POST /loginWeb': 'Users.loginWeb',
  '/logout': 'Users.logout',

  //Pdf
  'POST /pdf/create': 'Pdf.create',

  //Productos
  'POST /productos/addMercancia': 'ProductsHasZones.addCommodity',
  'POST /productos/import': 'Products.import',
  'POST /productos/findOne': 'Products.findOne',
  'POST /productos/findOneByEpc': 'Products.findOneByEpc',
  'POST /productos/findProductInLocalByEanPlu': 'ProductsHasZones.findProductInLocalByEanPlu',
  'POST /productos/findProductInLocalByEpc': 'ProductsHasZones.findProductInLocalByEpc',
  'POST /productos/update': 'Products.update',

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


  //Sells
  'POST /sells/create':'Sells.createSell',

  //Transferencias
  'POST /transferencias/crear':'Transfers.create',
  'POST /transferencias/buscar':'Transfers.find',
  'POST /transferencias/listTransfersByType':'Transfers.listTransfersByType',
  'POST /transferencias/listTransfersByShop':'Transfers.listTransfersByShop',
  'POST /transferencias/finishTransfer':'Transfers.finishTransfer',

  //Usuarios
  'POST /users':'Users.crearEmpleado',
  'POST /createAdmin':'Users.createAdmin',
  'POST /updateAdmin':'Users.updateAdmin',
  'POST /users/findEmployeeByUsername':'Users.findEmployeeByUsername',
  'POST /users/modifyEmployeeByUsername':'Users.modifyEmployeeByUsername',
  'POST /users/listEmployeesByCompany':'Users.listEmployeesByCompany',
  'POST /users/changeEmployeeState':'Users.changeEmployeeState',
  'POST /sync':'Users.sync',

  //Zones
  'POST /zones/find' : 'Zones.find'

};
