/**
 * Inventarios
 *
 * @description :: Server-side logic for managing Inventarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {


  listar: async function(req,res){
      let inventariosConsolidados, things, inventariosEmpleado = [];
      try {
        //Encontrar todos los empleados de la compania
        // empleados = await Empleados.find(
        //   {
        //     select: ['id'],
        //     where: {companias_id: req.empleado.companias_id.id}
        //   });
        // console.log(empleados);
        // let empleados_id = empleados.map(a => a.id);
        // inventariosConsolidados = await  InventariosConsolidados.find({
        //   empleados_id: {in: empleados_id}
        // });

        empleados = await  Empleados.find({
          where:{companias_id: req.empleado.companias_id.id}
        })
          .populate('inventarios',{
            where:{
              inventarios_consolidados_id: {'>': 0},
              colaborativo: req.body.colaborativo
            }
          });
        //Se elimina la informacion innecesaria y se muestra solo los inventarios de cada empleado
        empleados.forEach(function (empleado) {
          if(empleado.inventarios){
            empleado.inventarios.forEach(function (inventario) {
              inventariosEmpleado.push(inventario);
            })
          }
        });
        inventariosEmpleado = inventariosEmpleado.map(a => a.inventarios_consolidados_id);
        inventariosConsolidados = await  InventariosConsolidados.find({
          id: {in: inventariosEmpleado}
        });
        //Obtengo los inventarios consolidados a partir de los inventarios

        //Buscar inventarios que son colaborativos o no

        things = {code: '', data: inventariosConsolidados, error: null, propio: false, bd: false};
         return res.generalAnswer(things);
      } catch (err) {
        things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
        return res.generalAnswer(things);
      }
    },
  /**
   * Esta funcion se encarga de buscar los inventarios que pertenecen a un inventario consolidados, luego obtiene los
   * productos de dichos inventarios y los retorna
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  listarProductos: async function (req, res) {
    let inventarios_consolidados_id, inventario,things;
    inventarios_consolidados_id= req.body.inventarios_consolidados_id;
    if(inventarios_consolidados_id){
      try {
        let productosZona=[];
        inventarios = await Inventarios.find({inventarios_consolidados_id: inventarios_consolidados_id})
          .populate('productos_zona');
        async.each(inventarios, async function(inventario, cb){
          async.each(inventario.productos_zona, async function(element, cb){
            let producto = await Productos.findOne({id:element.productos_id});
            if(producto)
               element.productos_id = producto;
            productosZona.push(element);
            cb();
          }, function(error){
            cb(error);
          });

        }, async function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          inventarioConsolidado = await InventariosConsolidados.findOne({id:inventarios_consolidados_id});
          things.data = {
            productosZona: productosZona,
            inventariosConsolidados: inventarioConsolidado
          };
          return res.generalAnswer(things);
        });

      } catch (e) {
        things = {code: e.number, data: [], error: e};
        return res.generalAnswer(things);
      }

    }
  }
};
