/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    name: {
      type: "string",
    },
    epc: {
      model: "epcs",
      columnName: "epc_id",
      required: true
    },
    zone: {
      model: "zones",
      columnName: "zone_id",
      required: true
    }
  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.epc == "number")
      this.epc = {
        id: this.epc
      };
    if (typeof this.zone == "number")
      this.zone = {
        id: this.zone
      };
    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  },
};