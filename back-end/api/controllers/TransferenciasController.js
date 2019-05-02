/**
 * Transferencias
 *
 * @description :: Server-side logic for managing Transferencias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  /**
   * Se encarga de crear una transferencia
   * @param transferencia
   * @param productos
   */
  crear: function (req, res) {
    //Validate data
    if(!req.body.transferencia || !req.body.productos_zona_has_transferencias){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      req.body.transferencia=JSON.parse(req.body.transferencia);
    } catch (e) {
      // console.error(e);
    }
    let productos_zona_has_transferencias;
    try {
      productos_zona_has_transferencias = JSON.parse(req.body.productos_zona_has_transferencias);
    } catch (e) {
      productos_zona_has_transferencias = req.body.productos_zona_has_transferencias;
    }

    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        //Primero creo la transferencia
        req.body.transferencia.creador_id=req.empleado.id;
        //Generate Manifest
        //0 -> First Letter Company
        //1 -> First number from Id Company
        //2 -> First number from Id Local Orig
        //3 -> First number from Id Local Dest
        //4 -> Amount of product
        //5,6,7,8 -> Random text
        req.body.transferencia.manifiesto=
          req.empleado.companias_id.name.substr(0,1)+
          (req.empleado.companias_id.id+"").substr(0,1)+
          (req.body.transferencia.local_origen_id+"").substr(0,1)+
          (req.body.transferencia.local_destino_id+"").substr(0,1)+
          req.body.productos_zona_has_transferencias.length+
          sails.helpers.randomString(5);
        req.body.transferencia.estado=0;
        req.body.creador_id = req.empleado.id;
        let tra,p_t, things;
        try {
          tra = await Transferencias.create(req.body.transferencia).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        //Una vez creado la transferencia, le asocio los productos
        try {
          productos_zona_has_transferencias.forEach(ip => ip.transferencias_id = tra.id);
          p_t = await ProductosZonaHasTransferencias.createEach(productos_zona_has_transferencias).usingConnection(db).fetch();
          things = {
            code: 'Ok',
            data: {
              transferencia:tra,
              productos_zona_has_transferencias:p_t
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
   * @param productos (epcs ids)
   */
  buscar: async function (req, res) {
    let products, productosZonaHasTransferencias;
    if(!req.body.productos){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      products = await Epcs.find({where: {epc: [req.body.productos]}})
        .populate('productos_zona');
    } catch (e) {
      res.generalAnswer({error:e});
    }

    //Busco los productosZonaHasTransferencias
    try {
      productosZonaHasTransferencias = await ProductosZonaHasTransferencias.find({productos_zona_id: [products]}
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
   * @param local_id Id del local a buscar
   * @param tipo: Entrada o salida
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
      transferencias = await  Transferencias.find(
        tipo === 'entrada' ? {'local_origen_id': local_id} : {'local_destino_id': local_id}
      )
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



  obtenerTransferencias: async function (req, res) {

    if(!req.body.local_id){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let local_id=req.body.local_id;
    let transferencias, things;

    try {
      transferencias = await  Transferencias.find({
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
    if(!req.body.productos_zona_has_transferencias){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:new Error('error_G01')};
      return res.generalAnswer(things);
    }

    let productos_zona_has_transferencias;
    let transferencias, things;
    try {
      productos_zona_has_transferencias=JSON.parse(req.body.productos_zona_has_transferencias);
    } catch (e) {
      // console.error(e);
    }


    console.log(productos_zona_has_transferencias);

    sails.getDatastore()
      .transaction(async (db,proceed)=> {
        await ProductosZonaHasTransferencias.update(_.map(productos_zona_has_transferencias, 'id'), {estado: 1}).usingConnection(db);
        await productos_zona_has_transferencias.forEach(async function (pht) {
          //Find the zona where the product must go
          let transferencia = await Transferencias.findOne({id: pht.transferencias_id});
          if(transferencia){
            let locales_destino = await Locales.findOne({id:transferencia.local_destino_id})
              .populate("zonas",{limit:1});
            await ProductosZona.update({id:pht.productos_zonas_id}, {zonas_id: locales_destino.zonas[0].id}).usingConnection(db)
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
