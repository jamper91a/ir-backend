/**
 * Transferencias
 *
 * @description :: Server-side logic for managing Transferencias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
module.exports = {

  /**
   * Se encarga de crear una transferencia
   */
  create: function (req, res) {
    //Validate data
    if(!req.body.transfer || !req.body.products){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let products=req.body.products;
    let transfer=req.body.transfer;
    try {
      products = JSON.parse(req.body.products);
      transfer = JSON.parse(req.body.transfer);
    } catch (e) {

    }


    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        //Primero creo la transferencia
        transfer.employee=req.employee.id;
        //Generate Manifest
        //0 -> First Letter Company
        //1 -> First number from Id Company
        //2 -> First number from Id Local Orig
        //3 -> First number from Id Local Dest
        //4 -> Amount of product
        //5,6,7,8 -> Random text
        transfer.manifest=
          req.employee.company.name.substr(0,1)+
          (req.employee.company.id+"").substr(0,1)+
          (transfer.shopSource+"").substr(0,1)+
          (transfer.shopDestination+"").substr(0,1)+
          products.length+
          sails.helpers.randomString(5);
        transfer.state=0;
        transfer.employee = req.employee.id;
        let newTransfer,productsFromTransfer, things;
        try {
          newTransfer = await Transfers.create(transfer).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        //Una vez creado la transferencia, le asocio los productos
        try {
          products.forEach(ip => ip.transfer = newTransfer.id);
          productsFromTransfer = await TransfersHasZonesProducts.createEach(products).usingConnection(db).fetch();
          things = {
            code: 'Ok',
            data: {
              transfer:newTransfer,
              products:productsFromTransfer
            }};
          return proceed(null, things);
        } catch (err) {
          things = {code: err.message, error: err};
          return proceed(things);
        }
      })
      .then(function (operation) {
        return res.generalAnswer(operation);
      })
      .catch(function (error) {
        if(error.raw)
          error = error.raw;
        else{
          error.error = error;
        }
        return res.generalAnswer(error);
      });


  },

  /**
   * Se encarga de buscar una lista de productos en la tabla de transferencia y mostrar los detalles
   */
  find: async function (req, res) {
    let products, transferHasZonesProducts;
    if(!req.body.products){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      products = await Epcs.find({where: {epc: [req.body.products]}})
        .populate('products');
    } catch (e) {
      res.generalAnswer({error:e});
    }

    //Busco los productosZonaHasTransferencias
    try {
      transferHasZonesProducts = await TransfersHasZonesProducts.find({product: [products]}
        .populate("transfer"));
      let things = {
        code: 'Ok',
        data: {
          transferHasZonesProducts:transferHasZonesProducts,
          products: products
        }};

      return res.generalAnswer(things);
    } catch (e) {
      res.generalAnswer({error:e});
    }




  },

  /**
   * Funcion para obtener los manifiestos electronicos de las transferencias, se necesita el id del local y el tipo
   * de manifiesto a buscar (de entrada o de salida)
   */
  listTransfersByType: async function (req, res) {
    console.time('listTransfersByType');
    if(!req.body.shopSource || !req.body.type){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let shopSource=req.body.shopSource;
    let type=req.body.type;
    let transfers, things;

    try {
      transfers = await  Transfers.find(
        type === 'entrada' ? {'shopDestination': shopSource} : {'shopSource': shopSource}
      )
        .populate('products')
        .populate('shopSource')
        .populate('employee')
        .populate('shopDestination');
      let max = 0;

      do{
        max++;
        //Lleno la informacion de cada produco_zona_has_transferencias
        for (let i = 0; i < transfers.length; i++) {
          let transfer = transfers[i];
          //Busco la informacion del usuario generador de la transferencia
          let user = await Users.findOne({id: transfer.employee.user});
          // transfer.employee.user = user;
          for (let j = 0; j < transfer.products.length; j++) {
            let product = transfer.products[j];
            let productZone = product.product;
            //Busco la informacion de dichos elementos
            let auxproduct= await ProductsHasZones.findOne({id: productZone})
              .populate('product')
              .populate('epc');
            // transfers[i].products[j].product = auxproduct;
          }
        }
      }while (max <= 1000);

      things = {code: 'Ok', data: transfers};
      console.timeEnd('listTransfersByType');
      return res.generalAnswer(things);
    } catch (err) {
      things = {error: err};
      return res.generalAnswer(things);
    }

  },



  listTransfersByShop: async function (req, res) {

    if(!req.body.shop){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let shop=req.body.shop;
    let transfers, things;

    try {
      transfers = await  Transfers.find({
        or: [
          {'shopSource': shop},
          {'shopDestination': shop}
        ]
      })
        .populate('products')
        .populate('shopSource')
        .populate('shopDestination');

      things = {code: 'Ok', data: transfers};
      return res.generalAnswer(things);
    } catch (err) {
      things = {error: err};
      return res.generalAnswer(things);
    }

  },


  /**
   * Obtiene los productos_zona_has_transferencia les cambia le estado.
   * Ademas debe buscar el local destino y una zona que pertenezca a ese local para cambiar los produtos_zona a esa zona
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  finishTransfer: async function(req, res){
    if(!req.body.products){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:new Error('error_G01')};
      return res.generalAnswer(things);
    }

    let products=req.body.products;
    let newProducts = new Array();
    try {
      products=JSON.parse(req.body.products);
    } catch (e) {
      // sails.log.error(e);
    }

    sails.getDatastore()
      .transaction(async (db,proceed)=> {
        await TransfersHasZonesProducts.update(_.map(products, 'id'), {state: 1}).usingConnection(db);
        for(const pht of products){
          //Find the zona where the product must go
          let tranfer = await Transfers.findOne({id: pht.transfer});
          if(tranfer){
            var transferDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
            sails.log.info("transferDate: ",transferDate);
            try {
              let shopDestination = await Shops.findOne({id: tranfer.shopDestination})
                .populate("zone", {limit: 1});
              let pz = await ProductsHasZones.updateOne({id: pht.product}, {zone: shopDestination.zone[0].id, wasTransfered: 1, transfer_date: transferDate})                                                                 .usingConnection(db);
              newProducts.push(pz);
            } catch (e) {
              proceed(e);
            }
          }
        }
        return proceed(null, {code: 'Ok', data: newProducts});
        // try {
        //   productos_has_transferencias.forEach(ip => ip.transferencias_id = tra.id);
        //   return proceed(null, {});
        // } catch (err) {
        //   things = {code: err.message, error: err};
        //   return proceed(things);
        // }
      })
      .then(function (operation) {
        return res.generalAnswer(operation);
      })
      .catch(function (error) {
        sails.log.error(error);
        error = error.raw;
        return res.generalAnswer(error);
      });
  }

};
