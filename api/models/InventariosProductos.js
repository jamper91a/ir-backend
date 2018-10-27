/**
	Generated by sails-inverse-model
	Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
*/

module.exports = {
    attributes: {
        inventarios_id: {
            model: "inventarios"
        },
        productos_id: {
            model: "productos"
        },
        productos_epcs_id: {
            model: "epcs",
            unique:true
        },
        zona_id: {
          model: 'zonas',
          required: true
        },
    },
  /**
   * Antes de ingresar un producto a un inventario, debo validar:
   * Que el producto exista.
   * Que la zona del producto concuerde con la zona del inventario.
   * Que el estado del epc sea valido (1, lo que significa que se asigno y no se ha usado
   * @param valuesToSet
   * @param proceed
   */
  beforeCreate: function (valuesToSet, proceed) {


    if(Array.isArray(valuesToSet)){
      Productos.find({
        id: valuesToSet.productos_id
      })
        .populate('productos_zona')
        .then(function (producto) {
        if(producto && producto.length>0){
          if(producto.productos_zona)
          epc.state=1;
          epc.save();
          return proceed();
        } else
          return proceed({"error":'Tag no valido bc'});
      }).catch(function (err) {
        return proceed(err)
      });
    }else{
      try{
        Epcs.find({
          id: valuesToSet.epcs_id,
          state: 0
        }).then(function (epc) {
          if(epc && epc.length>0){
            return proceed();
          }else
            return proceed({"error":'Tag no valido bc'});
        }).catch(function (err) {
          return proceed(err)
        });
      }catch(err){
        console.error(err);
      }

    }

  }
};
