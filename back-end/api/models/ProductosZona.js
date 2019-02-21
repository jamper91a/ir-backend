/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
module.exports = {

  attributes: {
    productos_id: {
      model: "productos",
      required: true
    },
    zonas_id: {
      model: "zonas",
      required: true
    },
    fecha_ingreso: {
      type: 'ref', columnType: 'datetime', autoCreatedAt: true
    },
    fecha_venta: {
      type: 'ref', columnType: 'datetime',
    },
    fecha_devolucion: {
      type: 'ref', columnType: 'datetime',
    },
    devolucion_observaciones: {
      type: "string",
      allowNull: true
    },
    devoluciones_id: {
      model: "devoluciones",
    },
    logs_usuarios: {
      type: "string",
      allowNull: true
    },
    ventas_id: {
      model: "ventas",
      required: false
    },
    epcs_id: {
      model: "epcs",
      required: true
    },
    //Relaciones muchos a muchos
    inventarios:{
      collection: 'inventarios',
      via: 'productos_zona_id',
      through: 'inventariosProductos'
    }

  },
  customToJSON: function() {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if(typeof this.epcs_id =="number")
      this.epcs_id = {
        id: this.epcs_id
      };
    if(typeof this.ventas_id =="number")
      this.ventas_id = {
        id: this.ventas_id
      };
    if(typeof this.devoluciones_id =="number")
      this.devoluciones_id = {
        id: this.devoluciones_id
      };
    if(typeof this.zonas_id =="number")
      this.zonas_id = {
        id: this.zonas_id
      };
    if(typeof this.productos_id =="number")
      this.productos_id = {
        id: this.productos_id
      };
    return this;
  },
  beforeCreate: function (valuesToSet, proceed) {
    //Valido que el epc sea valido (lo busco por el epc y que el estado sea 0 -sin usar)

      try{
        Epcs.find({
          id: valuesToSet.epcs_id,
          state: 0
        }).then(function (epc) {
          if(epc && epc.length>0){
            return proceed();
          }else {
            let err = new Error('error_EPC01');
            err.bd = true;
            err.propio = true;
            err.number = 'error_EPC01';
            return proceed(err);
          }
        }).catch(function (err) {
          err.bd=true;
          err.propio=false;
          return proceed(err)
        });
      }catch(err){
        err.bd=false;
        err.propio=false;
        return proceed(err)
      }

  },
  tableName: 'productos_zonas'
};
