/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    state: {
      type: "number",
    },
    company: {
      model: 'companies',
      columnName: "company_id",
      required: true
    },
    epc: {
      type: "string",
      unique: true
    },
    dealer: {
      model: "dealers",
      columnName: "dealer_id",
      required: true
    },
  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.company == "number")
      this.company = {
        id: this.company
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