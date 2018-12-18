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

};

