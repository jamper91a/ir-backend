/**
 * Employees.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {

  attributes: {

    company: {
      model: 'companies',
      columnName: "company_id",
      required: true
    },
    user: {
      required: true,
      model: "users",
      unique: true,
      columnName: "user_id"
    },
    shop: {
      model: 'shops',
      required: true,
      columnName: "shop_id"
    },

    //Relaciones
    inventories: {
      collection: 'inventories',
      via: 'employee_id',
      through: 'inventories_users'
    }


  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.company == "number")
      this.company = {
        id: this.company
      };
    if (typeof this.user == "number")
      this.user = {
        id: this.user
      };
    if (typeof this.shop == "number")
      this.shop = {
        id: this.shop
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

