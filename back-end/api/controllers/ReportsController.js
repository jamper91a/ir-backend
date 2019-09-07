/**
 * Zonas
 *
 * @description :: Server-side logic for managing Zonas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
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
        .populate('products');
      //Add the products of the first inventory to an var
      let productsFirstInventory= [];
      for(const inventory  of inventories)
        productsFirstInventory = productsFirstInventory.concat(inventory.products);

      //Find all inventories of the second consolidated inventory
      inventories = await Inventories.find({
        where: {consolidatedInventory: req.body.secondInventory}
      })
        .populate('products');
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
            if (!req.body.products || !req.body.report.firstInventory || !req.body.report.secondInventory || !req.body.report.type) {
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
  }

};
