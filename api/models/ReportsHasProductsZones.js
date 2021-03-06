/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    report: {
      model: "reports",
      columnName: "report_id",
      required: true
    },
    product: {
      model: "productsHasZones",
      columnName: "products_zone_id",
      required: true
    },
    homologatorEmployee: {
      model: "employees",
      columnName: "homologator_employee_id"
    }
  },

  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.product == "number")
      this.product = {
        id: this.product
      };
    if (typeof this.report == "number")
      this.report = {
        id: this.report
      };
    if (typeof this.homologatorEmployee == "number")
      this.homologatorEmployee = {
        id: this.homologatorEmployee
      };

    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  },
  tableName: "reports_has_products_zones",

};
