/**
 * Zonas
 *
 * @description :: Server-side logic for managing Zonas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  diferenceBetweenInventories: async function(req,res){
    try {
      if (!req.body.inventario_inicial || !req.body.inventario_final) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);
      }
      //Find all inventories of the first consolidated inventory
      let inventories = await inventories.find({
        where: {consolidatedInventory: req.body.inventario_inicial}
      })
        .populate(products);
      //Add the products of the first inventory to an var
      let productsFirstInventory= [];
      for(const inventory  of inventories)
        productsFirstInventory = productsFirstInventory.concat(inventory.products);

      //Find all inventories of the second consolidated inventory
      inventories = await inventories.find({
        where: {consolidatedInventory: req.body.inventario_final}
      })
        .populate(products);
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
            if(firstProduct.ventas_id<=1){
              notFoundProducts.push(firstProduct);
              cb();
            }else{
              //Search for the product in the transfer table
              let transfer = await Transfers.find({where: {productos_zonas_id: firstProduct.id}});
              if(!transfer){
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

  guardarReporte: async function (req, res) {
    try {
      sails.getDatastore()
        .transaction(async (db,proceed)=> {

          try {
            if (!req.body.products || !req.body.reporte.inventario_inicial_id || !req.body.reporte.inventario_final_id || !req.body.reporte.tipo_inventario) {
              let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
              return res.generalAnswer(things);
            }
            req.body.reporte.employee=req.employee.id;
            let products= req.body.products;
            //Creo el reporte
            let reporte= await Reportes.create(req.body.reporte).usingConnection(db).fetch();
            //Asocios los productos al reporte reciente creado
            products.forEach(pz => pz.reportes_id = reporte.id);
            await ReportesHasProductosZonas.createEach(products).usingConnection(db);
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
