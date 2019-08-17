/**
	Generated by sails-inverse-model
	Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
*/
var moment = require('moment');
module.exports = {
    attributes: {

      empleados_id: {
        model: "empleados",
        required: true
      },
      inventario_inicial_id: {
        model: "inventariosConsolidados",
        required: true
      },
      inventario_final_id: {
        model: "inventariosConsolidados",
        required: true
      },
      tipo_inventario: {
        type: "number",
      },
      cantidad_total: {
        type: "number",
      },
      vendidas: {
        type: "number",
      },
      devueltas: {
        type: "number",
      },
      //   //region Relaciones
      productos:{
        collection: 'reportesHasProductosZonas',
        via: 'reportes_id'
      }
      // productos_zona:{
      //   collection: 'productosZona',
      //   via: 'inventarios_id',
      //   through: 'inventariosProductos'
      // },
        //endregion
    },
  customToJSON: function() {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if(typeof this.empleados_id =="number")
      this.empleados_id = {
        id: this.empleados_id
      };
    if(typeof this.inventario_inicial_id =="number")
      this.inventario_inicial_id = {
        id: this.inventario_inicial_id
      };
    if(typeof this.inventario_final_id =="number")
      this.inventario_final_id = {
        id: this.inventario_final_id
      };
    if(this.fecha){
      this.fecha = moment(this.fecha).format("YYYY-MM-DDTHH:mm:ss");
    }
    if(this.createdAt){
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if(this.updatedAt){
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  }
};
