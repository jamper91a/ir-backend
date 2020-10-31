/**
 * Zonas
 *
 * @description :: Server-side logic for managing Zonas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {

  diferenceBetweenInventories: async function(req,res){
    try {
      if (!req.body.firstInventory || !req.body.secondInventory) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);
      }
      //Find all inventories of the first consolidated inventory
      let inventories = await Inventories.find({
        where: {consolidatedInventory: req.body.firstInventory}
      })
        .populate('products.zone&product&epc');
      //Add the products of the first inventory to an var
      let productsFirstInventory= [];
      for(const inventory  of inventories)
        productsFirstInventory = productsFirstInventory.concat(inventory.products);

      //Find all inventories of the second consolidated inventory
      inventories = await Inventories.find({
        where: {consolidatedInventory: req.body.secondInventory}
      })
        .populate('products.zone&product&epc');
      //Add the products of the first inventory to an var
      let productsSecondInventory= [];
      for(const inventory  of inventories)
        productsSecondInventory = productsSecondInventory.concat(inventory.products);
      let notFoundProducts = [];
      //Search for the products of the first inventory in the second inventory
      async.forEach(productsFirstInventory,
        async function (firstProduct, cb) {
          let found = productsSecondInventory.find(product => product.id === firstProduct.id);
          //If the product was not found I will check if it was sold or transfer
          if(!found){
            if(firstProduct.sell<=1){
              if(!sails.helpers.existInArray(notFoundProducts, firstProduct))
                notFoundProducts.push(firstProduct);
              cb();
            }else{
              //Search for the product in the transfer table
              let transfer = await TransfersHasZonesProducts.find({where: {product: firstProduct.id}});
              if(!transfer){
                if(!sails.helpers.existInArray(notFoundProducts, firstProduct))
                  notFoundProducts.push(firstProduct);
              }
              cb();
            }
          }else{
            cb();
          }
        },
        function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          things.data = notFoundProducts;
          return res.generalAnswer(things);
        }
      );

    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

  saveReport: async function (req, res) {
    try {
      sails.getDatastore()
        .transaction(async (db,proceed)=> {
          //CONVERT TO JSON
          try {
            req.body.products = JSON.parse(req.body.products);
            req.body.report = JSON.parse(req.body.report);
          }catch (e) {

          }

          try {
            if (!req.body.products || !req.body.report.type) {
              let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
              return res.generalAnswer(things);
            }
            req.body.report.employee=req.employee.id;
            let products= req.body.products;
            //Creo el reporte
            let reporte= await Reports.create(req.body.report).usingConnection(db).fetch();
            //Asocios los productos al reporte reciente creado
            products.forEach(pz => pz.report = reporte.id);
            await ReportsHasProductsZones.createEach(products).usingConnection(db);
            things = {
              code: 'ok', data: {}, error: null, propio: false, bd: false};
            return proceed(null, things);
          } catch (err) {
            things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
            return proceed(things);
          }

        })
        .then(function (operation) {
          return res.generalAnswer(operation);
        })
        .catch(function (error) {
          error = error.raw;
          return res.generalAnswer(error);
        });

    }catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);

    }
  },

  getReportsByType: async function(req, res){
    let things = {};
    if (!req.body.type) {
      let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
      return res.generalAnswer(things);
    }
    try {
      switch (req.body.type) {
        case "diferenceBetweenInventories":
          let reports = await Reports.find({
            where: {
              type: 1
            }
          });
          things = {
            code: 'ok', data: reports, error: null, propio: false, bd: false
          };
          break;
      }
      return res.generalAnswer(things);
    } catch (e) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }

  },

  getReportById: async function(req, res){
    console.time('getReportById');
    let things;
    if (!req.body.id) {
      things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
      return res.generalAnswer(things);
    }
    try {
        let report = await Reports.findOne({
          where: { id: req.body.id }
        })
          .populate('products',{
            where:{
              homologatorEmployee: null
            }
          });
        //Get the products zone
      if(report){
        let productsZones = [];
        for(const product of report.products){
          //Check the productZone
          const productsZone = await ProductsHasZones.findOne({
            where:{
              id: product.product
            }
          })
            .populate('zone')
            .populate('epc')
            .populate('product');
          if(productsZone){
            productsZones.push(productsZone);
          }
        }
        let data = {
          report: report,
          productsHasZones: productsZones
        };
        things = {
          code: 'ok', data: data, error: null, propio: false, bd: false
        };

      }else{
        things = {code: 'error_G06', req: req, res: res, data: [], error: new Error("error_G06")};
      }
      console.timeEnd('getReportById');
      return res.generalAnswer(things);
    } catch (e) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }

  },

  homologateUnits: async function(req, res){
    let things = {};
    if (!req.body.products) {
      let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
      return res.generalAnswer(things);
    }
    try {
      //CONVERT TO JSON
      let products, homologator_employee_id;
      try {
        products = JSON.parse(req.body.products);
      }catch (e) {
        products = req.body.products;
      }
      homologator_employee_id = req.employee.id;
      sails.log.info(products);
      sails.log.info(homologator_employee_id);
      await ReportsHasProductsZones.update(_.map(products, 'id'), {homologatorEmployee: homologator_employee_id});
      things = {
        code: 'ok', data: {}, error: null, propio: false, bd: false
      };
      return res.generalAnswer(things);
    } catch (e) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }

  },

  saleUnits: async function(req,res){
    try {
      if (!req.body.firstDate || !req.body.secondDate) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);
      }

      let firstDate =req.body.firstDate + " 00:00:00";
      let secondDate =req.body.secondDate + " 23:59:59";

      //Check all the zones of the local
      //Find all zones from the employee's company
      let zones = await Zones.find({
        where: {
          shop: req.employee.shop.id
        },
        select: ['id']
      });
      zones = zones.map(z => z.id);
      let products = await ProductsHasZones.find({
        where:{
          or:[
            //Search all the product that were not transfer,  belongs to the local and the created date is in the range.
            {
              or:[
                {wasTransfered: null}, {wasTransfered:0}
                ], zone: zones, createdAt: {'>=': firstDate, '<=': secondDate }},
            //Search all the products that were transfer and belongs to the loca and the updated date is in the range
            {wasTransfered: 1, zone: zones, transfer_date: {'>=': firstDate, '<=': secondDate }},
          ]
        }
      });


      let saleUnits = [];
      let returnedUnits = [];
      //Search for the products of the first inventory in the second inventory
      async.forEach(products,
        async function (product, cb) {
          if(product.sell>1){
            if(!sails.helpers.existInArray(saleUnits, product))
              saleUnits.push(product);
            cb();
          }else{
            if(product.devolution>1){
              if(!sails.helpers.existInArray(returnedUnits, product))
                returnedUnits.push(product);
            }
            cb();
          }

        },
        function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          things.data = {
            saleUnits: saleUnits,
            returnedUnits: returnedUnits
          };
          return res.generalAnswer(things);
        }
      );




    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

  rotationUnits: async function(req,res){
    try {
      if (!req.body.firstDate || !req.body.secondDate) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);
      }

      let firstDate =req.body.firstDate + " 00:00:00";
      let secondDate =req.body.secondDate + " 23:59:59";

      let auxEmployee;
      auxEmployee = req.body.employee ? req.body.employee : req.employee;
      let shop = auxEmployee.shop.id;
      //let company = auxEmployee.company.id;

      //Check all the zones of the local
      //Find all zones from the employee's company
      let zones = await Zones.find({
        where: {
          shop: shop.id
        },
        select: ['id']
      });
      zones = zones.map(z => z.id);
      let products = await ProductsHasZones.find({
        where:{
          or:[
            //Search all the product that were not transfer,  belongs to the local and the created date is in the range.
            {or:[{wasTransfered: null}, {wasTransfered:0}], zone: zones, createdAt: {'>=': firstDate, '<=': secondDate }},
            //Search all the products that were transfer and belongs to the loca and the updated date is in the range
            {wasTransfered: 1, zone: zones, transfer_date: {'>=': firstDate, '<=': secondDate }},
          ]
        }
      })
        .populate('zone')
        .populate('product')
        .populate('epc');
      let things={code: '', data:[], error:null};
      things.data = products;
      return res.generalAnswer(things);


    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

  devolutionsByType: async function(req,res){
    try {
      if (!req.body.firstDate || !req.body.secondDate || !req.body.type) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);
      }

      let firstDate =req.body.firstDate + " 00:00:00";
      let secondDate =req.body.secondDate + " 23:59:59";
      let type =req.body.type;

      let auxEmployee;
      auxEmployee = req.body.employee ? req.body.employee : req.employee;
      let shop = auxEmployee.shop.id;
      //let company = auxEmployee.company.id;

      //Check all the zones of the local
      //Find all zones from the employee's company
      let zones = await Zones.find({
        where: {
          shop: shop.id
        },
        select: ['id']
      });
      zones = zones.map(z => z.id);

      //Find all devolutions by type
      let devolutions = await Devolutions.find({
        where: {
          type: type
        },
        select: ['id']
      });
      devolutions = devolutions.map(d => d.id);
      let products = await ProductsHasZones.find({
        where:{
          or:[
            //Search all the product that were not transfer,  belongs to the local and the created date is in the range.
            {or:[{wasTransfered: null}, {wasTransfered:0}], zone: zones, createdAt: {'>=': firstDate, '<=': secondDate }},
            //Search all the products that were transfer and belongs to the loca and the updated date is in the range
            {wasTransfered: 1, zone: zones, transfer_date: {'>=': firstDate, '<=': secondDate }},
          ],
          devolution: devolutions
        }
      })
        .populate('zone')
        .populate('product&supplier')
        .populate('epc');

      //Find the information of the supplier
      async.forEach(products,
        async function (product, cb) {
          try {
            let infoProduct = await Products.findOne({
              where: {id: product.product.id}
            })
              .populate('supplier');
            if (infoProduct) {
              product.product = infoProduct;
            }
            cb();
          } catch (e) {
            cb(e)
          }
        },
        function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          things.data = products;
          return res.generalAnswer(things);
        }
      );



    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

  rotationProyectedByEanPlu: async function (req, res){
    try {
      if (!req.body.days || !req.body.product_id ) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);
      }

      let days =req.body.days;
      let product_id =req.body.product_id;

      let firstDate =new Date();
      let secondDate =new Date();
      firstDate = firstDate.setDate(firstDate.getDate()-days);

      firstDate = moment(firstDate).format("YYYY-MM-DD") + " 00:00:00";
      secondDate = moment(secondDate).format("YYYY-MM-DD") + " 23:59:59";

      sails.log.info(firstDate);
      sails.log.info(secondDate);

      //Find all products that were sold in those days
      let products  = await ProductsHasZones.find({
          where:{
            sell: {'>':1 },
            product: product_id,
            sell_date: {'>=': firstDate, '<=': secondDate }
          }
      })
        .populate('sell')
        .populate('product');

      let things={code: '', data:products, error:null};
      res.generalAnswer(things);

    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

  diferenceWithInventoryErp: async function (req, res){
    try {
      let auxEmployee;
      auxEmployee = req.body.employee ? req.body.employee : req.employee;
      let shop = auxEmployee.shop.id;
      let company = auxEmployee.company.id;
      let total_products_query = `
        SELECT COUNT(1) as total, p.id,p.size, ean, plu, plu2, plu3, description, imagen
        FROM products_has_zones phz, products p, zones z
        WHERE p.company_id = $1 AND phz.product_id = p.id AND phz.zone_id =z.id AND z.shop_id = $2
        GROUP BY p.id, p.size, p.ean, p.plu, p.plu2, p.plu3, description, imagen;`;
      //Get total of every products that has not been sold or transfer
      let allProducts = await sails.sendNativeQuery(total_products_query, [ company, shop ]);
      let lastInventoryErp = await InventoryErp.find({
        where:{
          shop:shop
        },
        limit: 1,
        sort: 'id DESC'
      });
      if(allProducts && lastInventoryErp){
        allProducts = allProducts.rows;
        if(lastInventoryErp && lastInventoryErp.length>0)
          lastInventoryErp = lastInventoryErp[0].products;
        for(let product of allProducts){
          product.erp = 0;
          for(let erpProduct of lastInventoryErp){
            if(product.ean === erpProduct.ean ||
              product.plu === erpProduct.plu ||
              product.plu2 === erpProduct.plu2 ||
              product.plu3 === erpProduct.plu3
            ){
              product.erp = erpProduct.total
            }
          }
        }
      }


      let things={code: '', data:allProducts, error:null};
      res.generalAnswer(things);

    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },



};
