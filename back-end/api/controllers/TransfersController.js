/**
 * Transferencias
 *
 * @description :: Server-side logic for managing Transferencias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
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
    // try {
    //   req.body.transferencia=JSON.parse(req.body.transferencia);
    // } catch (e) {
    //   // console.error(e);
    // }
    let products=req.body.products;
    // try {
    //   products = JSON.parse(req.body.products);
    // } catch (e) {
    //   products = req.body.products;
    // }

    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        //Primero creo la transferencia
        req.body.transfer.employee=req.employee.id;
        //Generate Manifest
        //0 -> First Letter Company
        //1 -> First number from Id Company
        //2 -> First number from Id Local Orig
        //3 -> First number from Id Local Dest
        //4 -> Amount of product
        //5,6,7,8 -> Random text
        req.body.transfer.manifest=
          req.employee.company.name.substr(0,1)+
          (req.employee.company.id+"").substr(0,1)+
          (req.body.transfer.shopSource+"").substr(0,1)+
          (req.body.transfer.shopDestination+"").substr(0,1)+
          req.body.products.length+
          sails.helpers.randomString(5);
        req.body.transfer.state=0;
        req.body.employee = req.employee.id;
        let newTransfer,productsFromTransfer, things;
        try {
          newTransfer = await Transfers.create(req.body.transfer).usingConnection(db).fetch();
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
  buscar: async function (req, res) {
    let products, productosZonaHasTransferencias;
    if(!req.body.productos){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      products = await Epcs.find({where: {epc: [req.body.productos]}})
        .populate(products);
    } catch (e) {
      res.generalAnswer({error:e});
    }

    //Busco los productosZonaHasTransferencias
    try {
      productosZonaHasTransferencias = await TransfersHasZonesProducts.find({product: [products]}
        .populate("transferencias"));
      let things = {
        code: 'Ok',
        data: {
          productosZonaHasTransferencias:productosZonaHasTransferencias,
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
  obtenerTransferencia: async function (req, res) {

    if(!req.body.local_id || !req.body.tipo){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let local_id=req.body.local_id;
    let tipo=req.body.tipo;
    let transferencias, things;

    try {
      transferencias = await  Transfers.find(
        // tipo === 'entrada' ? {'local_origen_id': local_id} : {'local_destino_id': local_id}
        tipo === 'entrada' ? {'local_destino_id': local_id} : {'local_origen_id': local_id}
      )
        .populate('productos')
        .populate('local_origen_id')
        .populate('local_destino_id');

      //Lleno la informacion de cada produco_zona_has_transferencias
      for (let i = 0; i < transferencias.length; i++) {
        let transferencia = transferencias[i];
        for (let j = 0; j < transferencia.productos.length; j++) {
          let producto = transferencia.productos[j];
          let pzi = producto.product;
          //Busco la informacion de dichos elementos
          transferencias[i].productos[j].product = await ProductsHasZones.findOne({id: pzi});
        }
      }
      // transferencias.forEach(async function (transferencia, indexA, array) {
      //   await transferencia.productos.forEach(async function (producto, indexB, array) {
      //     let pzi = producto.productos_zona_id;
      //     //Busco la informacion de dichos elementos
      //     let pz = await ProductosZona.findOne({id:pzi});
      //     array[indexB].productos_zona_id = pz;
      //   });
      //   array[indexA].productos = transferencia.productos;
      // });
      things = {code: 'Ok', data: transferencias};

      return res.generalAnswer(things);
    } catch (err) {
      things = {error: err};
      return res.generalAnswer(things);
    }

  },



  obtenerTransferencias: async function (req, res) {

    if(!req.body.local_id){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let local_id=req.body.local_id;
    let transferencias, things;

    try {
      transferencias = await  Transfers.find({
        or: [
          {'local_origen_id': local_id},
          {'local_destino_id': local_id}
        ]
      })
        .populate('productos')
        .populate('local_origen_id')
        .populate('local_destino_id');

      things = {code: 'Ok', data: transferencias};
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
  finalizarTransferencia: async function(req, res){
    if(!req.body.products){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:new Error('error_G01')};
      return res.generalAnswer(things);
    }

    let products;
    try {
      products=JSON.parse(req.body.products);
    } catch (e) {
      // console.error(e);
    }


    console.log(products);

    sails.getDatastore()
      .transaction(async (db,proceed)=> {
        await TransfersHasZonesProducts.update(_.map(products, 'id'), {estado: 1}).usingConnection(db);
        await products.forEach(async function (pht) {
          //Find the zona where the product must go
          let transferencia = await Transfers.findOne({id: pht.transfer});
          if(transferencia){
            let locales_destino = await Shops.findOne({id:transferencia.local_destino_id})
              .populate("zonas",{limit:1});
            console.log(pht.product);
            await ProductsHasZones.updateOne({id:pht.product}, {zone: locales_destino.zonas[0].id}).usingConnection(db)
          }
        });
        return proceed(null, {});
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
        console.error(error);
        error = error.raw;
        return res.generalAnswer(error);
      });
  }

};
