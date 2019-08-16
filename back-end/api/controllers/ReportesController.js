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
      let inventories = await Inventarios.find({
        where: {inventarios_consolidados_id: req.body.firstInventory}
      })
        .populate('productos_zona');
      //Add the products of the first inventory to an var
      let productsFirstInventory= new Array();
      for(const inventory  of inventories)
        productsFirstInventory = productsFirstInventory.concat(inventory.productos_zona);

      //Find all inventories of the second consolidated inventory
      inventories = await Inventarios.find({
        where: {inventarios_consolidados_id: req.body.secondInventory}
      })
        .populate('productos_zona');
      //Add the products of the first inventory to an var
      let productsSecondInventory= new Array();
      for(const inventory  of inventories)
        productsSecondInventory = productsSecondInventory.concat(inventory.productos_zona);
      let notFoundProducts = new Array();
      //Search for the products of the first inventory in the second inventory
      async.forEach(productsFirstInventory,
        async function (firstProduct, cb) {
          let found = productsSecondInventory.find(product => product.id == firstProduct.id);
          //If the product was not found I will check if it was sold or transfer
          if(!found){
            if(firstProduct.ventas_id<=1){
              notFoundProducts.push(firstProduct);
              cb();
            }else{
              //Search for the product in the transfer table
              let transfer = await Transferencias.find({where: {productos_zonas_id: firstProduct.id}});
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

};
