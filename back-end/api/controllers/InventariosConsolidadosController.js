/**
 * Inventarios
 *
 * @description :: Server-side logic for managing Inventarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {


  listar: async function(req,res){
      let inventariosConsolidados, things;
      try {
        //Encontrar todos los empleados de la compania
        empleados = await Empleados.find(
          {
            select: ['id'],
            where: {companias_id: req.empleado.companias_id.id}
          });
        let empleados_id = empleados.map(a => a.id);
        inventariosConsolidados = await  InventariosConsolidados.find({
          empleados_id: {in: empleados_id}
        });
        things = {code: '', data: inventariosConsolidados, error: null, propio: false, bd: false};
         return res.generalAnswer(things);
      } catch (err) {
        things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
        return res.generalAnswer(things);
      }
    },

  listarProductos: async function (req, res) {
    let inventario_id, inventario,things;
    inventario_id= req.body.inventarios_id;
    if(inventario_id){
      try {
        inventario = await Inventarios.findOne({id: inventario_id})
          .populate('productos_zona');
        async.each(inventario.productos_zona, async function(element, cb){
          let producto = await Productos.findOne({id:element.productos_id});
          if(producto)
            element.productos_id = producto;
          cb();
        }, function(error){
          let things={code: '', data:[], error:null};
          if(error){
            things.error=error;
          }
          things.data = inventario;
          return res.generalAnswer(things);
        });

      } catch (e) {
        things = {code: e.number, data: [], error: e};
        return res.generalAnswer(things);
      }

    }
  }
};
