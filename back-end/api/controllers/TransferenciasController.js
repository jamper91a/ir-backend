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
    if(!req.body.transferencia || !req.body.productos_has_transferencias){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    let productos_has_transferencias=req.body.productos_has_transferencias;

    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        //Primero creo la transferencia
        req.body.transferencia.creador_id=req.empleado.id;
        req.body.transferencia.manifiesto="";
        req.body.transferencia.estado=0;
        let tra,p_t, things;
        try {
          tra = await Transferencias.create(req.body.transferencia).usingConnection(db).fetch();
        } catch (err) {
          things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
          return proceed(things);
        }
        //Una vez creado la transferencia, le asocio los productos
        try {
          productos_has_transferencias.forEach(ip => ip.transferencias_id = tra.id);
          p_t = await ProductosZonaHasTransferencias.createEach(productos_has_transferencias).usingConnection(db).fetch();
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
        error = error.raw;
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
  obtenerTransferencias: async function (req, res) {

    if(!req.body.local_id || req.body.tipo){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }

    let local_id=req.body.local_id;
    let tipo=req.body.tipo;
    let transferencias, things;

    try {
      transferencias = await  Transferencias.find({
        where:{companias_id: req.empleado.companias_id.id}
      })
        .populate('productos_zona_has_inventario',{
          where:{
            inventarios_consolidados_id:
             // Si es tipo entrada, busco por el local origen, si no, por el local destino
              (tipo == 'entrada' ? {'local_origen_id': local_id} : {'local_destino_id': local_id}),
            // Busco aquellas transferencias sin finalizar
            estado: 1
          }
        });

      things = {code: 'Ok', data: transferencias};
      return res.generalAnswer(things);
    } catch (err) {
      things = {error: err};
      return res.generalAnswer(things);
    }

  }

};
