/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    ean: {type: "string"},
    plu: {type: "string"},
    plu2: {type: "string"},
    plu3: {type: "string"},
    branch: {type: "string"},
    gender: {type: "string"},
    color: {type: "string"},
    size: {type: "string"},
    category: {type: "string"},
    description: {type: "string"},
    amount: {type: "number"},
    imagen: {
      type: "string",
      allowNull: true
    },
    cost_price: {
      type: "number"
    },
    sell_price: {
      type: "number"
    },
    company: {
      model: "companies",
      columnName: "company_id",
      required: true
    },
    supplier: {
      model: "suppliers",
      columnName: "supplier_id"
    },

  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.company == "number")
      this.company = {
        id: this.company
      };
    if (typeof this.supplier == "number")
      this.supplier = {
        id: this.supplier
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
