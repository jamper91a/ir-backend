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
  'POST /companies/getEmployeesByAdmin':'Companies.getEmployeesByAdmin',
  'POST /companies/update':'Companies.update',

  'POST /company/getCompaniesByDealer':'Company.get-companies-by-dealer',
  'POST /company/getCompanyById':'Company.get-company-by-id',
  'POST /company/getEmployeesByAdmin':'Company.get-employees-by-admin',
  'POST /company/update':'Company.update',

  //Dealers
  'POST /dealers/getAllDealers':'Dealers.getAllDealers',
  'POST /dealers/create':'Dealers.create',
  'POST /dealers/update':'Dealers.update',
  'POST /dealers/getAllActiveDealers':'Dealers.getAllActiveDealers',

  'POST /dealer/create':'dealer.create-dealer',
  'POST /dealer/getAllActiveDealers':'dealer.get-all-active-dealers',
  'POST /dealer/getAllDealers':'dealer.get-all-dealers',
  'POST /dealer/update':'dealer.update-dealer',


  //Devoluciones
  'POST /devoluciones/devolverProductos':'Devolutions.returnProducts',

  'POST /devolution/returnProducts':'Devolution.return-products',

  //Epc
  'POST /epcs/create':'Epcs.create',
  'POST /epcs/tagsByDealerByMonth':'Epcs.tagsByDealerByMonth',
  'POST /epcs/tagsByCompanyByMonth':'Epcs.tagsByCompanyByMonth',

  'POST /epc/create':'epc.create-epc',
  'POST /epc/tagsByCompanyByMonth':'epc.tags-by-company-monthly',
  'POST /epc/tagsByDealerByMonth':'epc.tags-by-dealer-monthly',

  //Inventarios
  'POST /inventarios/crear':'Inventories.create',
  'POST /inventarios/consolidar':'Inventories.consolidate',
  'POST /inventarios/listarInventarios':'Inventories.list',
  'POST /inventarios/listarProductosInventario':'Inventories.listProducts',
  'POST /inventarios/adjuntar':'Inventories.attach',

  'POST /inventory/attach':'inventory.attach-inventory',
  'POST /inventory/consolidate':'inventory.consolidate-inventory',
  'POST /inventory/create':'inventory.create-inventory',
  'POST /inventory/list':'inventory.list-inventories',
  'POST /inventory/list-products-by-inventory':'inventory.list-products',

  //InventariosConsolidados
  'POST /inventariosConsolidados/listar':'ConsolidatedInventories.list',//->listByCollaborative
  'POST /inventariosConsolidados/listarTodos':'ConsolidatedInventories.listAll',//->listAll
  'POST /inventariosConsolidados/listarProductos':'ConsolidatedInventories.listProducts',
  'POST /inventariosConsolidados/ultimoInventario':'ConsolidatedInventories.lastInventory',
  'POST /inventariosConsolidados/ultimoInventarioAdmin':'ConsolidatedInventories.lastInventoryAdmin',

  'POST /ci/lastInventory':'consolidated-inventory.last-inventory',
  'POST /ci/lastInventoryByEmployee':'consolidated-inventory.last-inventory-by-employee',
  'POST /ci/listAll':'consolidated-inventory.list-all',
  'POST /ci/listByCollaborative':'consolidated-inventory.list-by-collaborative',
  'POST /ci/listProducts':'consolidated-inventory.list-products',

  //Inventory Erp
  'POST /inventoryErp/create':'InventoriesErp.create',

  'POST /inventory-erp/create' : 'inventory-erp.create-inventory-erp',

  //Login
  'POST /login': 'Users.login',
  'POST /loginWeb': 'Users.loginWeb',
  '/logout': 'Users.logout',

  //Pdf
  'POST /pdf/create': 'Pdf.create',
  'POST /pdf/createPdf': 'pdf.create-pdf',

  //Productos
  'POST /productos/addMercancia': 'ProductsHasZones.addCommodity',
  'POST /productos/import': 'Products.import',
  'POST /productos/findOne': 'Products.findOne',
  'POST /productos/findOneByEpc': 'Products.findOneByEpc',
  'POST /productos/findProductInLocalByEanPlu': 'ProductsHasZones.findProductInLocalByEanPlu',
  'POST /productos/findProductInLocalByEpc': 'ProductsHasZones.findProductInLocalByEpc',
  'POST /productos/update': 'Products.update',

  'POST /product/create' : 'product.create-product',
  'POST /product/find-one' : 'product.find-one-product',
  'POST /product/find-by-epc' : 'product.find-product-by-epc',
  'GET  /product/find-all' : 'product.find-products',
  'POST /product/import' : 'product.import-products',
  'POST /product/update' : 'product.update-product',


  'POST /product/add-commodity' : 'product-has-zone.add-commodity',
  'POST /product/find-products-in-local-by-id' : 'product-has-zone.find-products-in-local-by-id',
  'POST /product/find-products-in-local-by-epc' : 'product-has-zone.find-products-in-local-by-epc',

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
  'POST /reportes/sendReport': 'Reports.sendReport',

  'POST /report/difference-between-inventories': 'report.difference-between-inventories',
  'POST /report/save-report': 'report.save-report',
  'POST /report/get-reports-by-type': 'report.get-reports-by-type',
  'POST /report/get-report-by-id': 'report.get-report-by-id',
  'POST /report/homologate-units': 'report.homologate-units',
  'POST /report/sale-units': 'report.sale-units',
  'POST /report/rotation-units': 'report.rotation-units',
  'POST /report/devolutions-by-type': 'report.devolutions-by-type',
  'POST /report/rotation-proyected-by-ean-plu': 'report.rotation-proyected-by-ean-plu',
  'POST /report/difference-with-inventory-erp': 'report.difference-with-inventory-erp',


  //Sells
  'POST /sells/create':'Sells.createSell',

  'POST /sell/create-sell':'sell.create-sell',

  //Shops
  'POST /shop/create-shop': 'shop.create-shop',
  'GET /shop/find-shops-by-company': 'shop.find-shops-by-company',


  //Suppliers
  'POST /supplier/create-supplier': 'supplier.create-supplier',
  'GET /supplier/find-suppliers-by-company': 'shop.find-suppliers-by-company',

  //Transferencias
  'POST /transferencias/crear':'Transfers.create',
  'POST /transferencias/buscar':'Transfers.find',
  'POST /transferencias/listTransfersByType':'Transfers.listTransfersByType',
  'POST /transferencias/listTransfersByShop':'Transfers.listTransfersByShop',
  'POST /transferencias/finishTransfer':'Transfers.finishTransfer',

  'POST /transfer/create-transfer':'transfer.create-transfer',
  'POST /transfer/get-transfers-by-type':'transfer.get-transfers-by-type',
  'POST /transfer/get-transfers-by-shop':'transfer.get-transfers-by-shop',
  'POST /transfer/finish-transfer':'transfer.finish-transfer',

  //Usuarios
  'POST /users':'Users.crearEmpleado',
  'POST /createAdmin':'Users.createAdmin',
  'POST /updateAdmin':'Users.updateAdmin',
  'POST /users/findEmployeeByUsername':'Users.findEmployeeByUsername',
  'POST /users/modifyEmployeeByUsername':'Users.modifyEmployeeByUsername',
  'POST /users/listEmployeesByCompany':'Users.listEmployeesByCompany',
  'POST /users/changeEmployeeState':'Users.changeEmployeeState',
  'POST /sync':'Users.sync',

  'POST /user/create-employee': 'user.create-employee',
  'POST /user/create-admin': 'user.create-admin',

  //Zones
  'POST /zones/find' : 'Zones.find'



};
