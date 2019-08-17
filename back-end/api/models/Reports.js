/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    type: {type: "number"},
    amount: {type: "number"},
    units_sell: {type: "number"},
    units_returned: {type: "number"},
    employee: {
      model: "employees",
      columnName: "employee_id",
      required: true
    },
    firstInventory: {
      model: "consolidatedInventories",
      columnName: "inventory_first_id",
      required: true
    },
    secondInventory: {
      model: "consolidatedInventories",
      columnName: "inventory_second_id",
      required: true
    },
    //   //region Relaciones
    products: {
      collection: 'reportsHasProductosZonas',
      via: 'report_id'
    }
    // productos_zona:{
    //   collection: 'productosZona',
    //   via: 'inventarios_id',
    //   through: 'inventariosProductos'
    // },
    //endregion
  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.employee == "number")
      this.employee = {
        id: this.employee
      };
    if (typeof this.firstInventory == "number")
      this.firstInventory = {
        id: this.firstInventory
      };
    if (typeof this.secondInventory == "number")
      this.secondInventory = {
        id: this.secondInventory
      };
    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  }
};
