/**
 * Empleados.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    companias_id: {
      model: 'companias',
      required: true
    },
    users_id: {
      required: true,
      model: "users",
      unique: true
    },
    locales_id: {
      model: 'locales',
      required: true
    },

    //Relaciones
    inventarios:{
      collection: 'inventarios',
      via: 'empleados_id',
      through: 'usersInventarios'
    }


  },
  customToJSON: function() {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if(typeof this.companias_id =="number")
      this.companias_id = {
        id: this.companias_id
      };
    if(typeof this.users_id =="number")
      this.users_id = {
        id: this.users_id
      };
    if(typeof this.locales_id =="number")
      this.locales_id = {
        id: this.locales_id
      };
    if(typeof this.zonas_id =="number")
      this.zonas_id = {
        id: this.zonas_id
      };
    if(typeof this.productos_id =="number")
      this.productos_id = {
        id: this.productos_id
      };
    return this;
  },

};

