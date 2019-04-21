/**
	Generated by sails-inverse-model
	Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
*/

module.exports = {
    attributes: {
        creador_id: {
            model: "empleados",
            required: true
        },
        manifiesto: {
            type: "string",
        },
        local_origen_id: {
            model: "locales",
            required: true
        },
        local_destino_id: {
            model: "locales",
            required: true
        },
        estado: {
            type: "boolean",

        },
        mensaje: {
            type: "string"
        },
        //Relaciones muchos a muchos
        productos: {
          collection: 'ProductosZonaHasTransferencias',
          via: 'transferencias_id'
        },
      // empleados:{
      //   collection: "empleados",
      //   via: "locales_id"
      // }
    },
  customToJSON: function() {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if(typeof this.creador_id =="number")
      this.creador_id = {
        id: this.creador_id
      };
    if(typeof this.local_origen_id =="number")
      this.local_origen_id = {
        id: this.local_origen_id
      };
    if(typeof this.local_destino_id =="number")
      this.local_destino_id = {
        id: this.local_destino_id
      };

    return this;
  },
};
