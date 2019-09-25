/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    date: {
      type: 'ref', columnType: 'datetime', autoCreatedAt: true
    },
    parcial: {
      type: "number",
    },
    collaborative: {
      type: "number",
    },
    message: {
      type: "string",
    },
    zone: {
      model: "zones",
      columnName: "zone_id",
      required: true
    },
    consolidatedInventory: {
      model: "ConsolidatedInventories",
      columnName: "consolidated_inventory_id",
      required: false
    },
    //region Relaciones
    products: {
      collection: 'ProductsHasZones',
      via: 'inventory',
      through: 'InventoriesHasProducts'
    },
    employees: {
      collection: 'Employees',
      via: 'inventory',
      through: 'EmployeesInventories'
    }
    //endregion
  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objeto
    if (typeof this.zone == "number")
      this.zone = {
        id: this.zone
      };
    if (typeof this.consolidatedInventory == "number")
      this.consolidatedInventory = {
        id: this.consolidatedInventory
      };
    if (this.date) {
      this.date = moment(this.date).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  }
};
