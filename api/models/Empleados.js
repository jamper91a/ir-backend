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
    //Un Empleado pertenece solo a un usuario
    /*usuario: {
      model: "users",
      unique: true
    },
    // Un empleado tiene una compania
    compania: {
      model: 'companias'
    },
    // Un empleado tiene una compania
    local: {
      model: 'locales'
    }*/


  },

};

