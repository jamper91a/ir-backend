/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:28 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    name: {
      type: "string",

    },
    //Relaciones
    employees: {
      collection: "employees",
      via: "company"
    },
    ecps: {
      collection: "epcs",
      via: "company"
    },
    products: {
      collection: "products",
      via: "company"
    },
    shops: {
      collection: "shops",
      via: "company"
    },
    dealer: {
      model: "dealers",
      columnName: "dealer_id",
      required: true
    },
  },
  customToJSON: function () {
    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  }
};
