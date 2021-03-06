/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    name: {type: 'string'},
    total_products: {type: 'number'},
    employee: {
      model: "employees",
      columnName: "employee_id",
      required: true
    },
    //Relaciones
    inventories: {
      collection: 'inventories',
      via: 'consolidatedInventory'
    }
  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.employee == "number")
      this.employee = {
        id: this.employee
      };
    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  },
  tableName: 'consolidated_inventories'
};
