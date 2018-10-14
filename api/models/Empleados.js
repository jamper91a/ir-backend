/**
 * Empleados.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    companias_id: {
      type: "number",
      required: true
    },
    users_id: {
      type: "number",
      required: true
    },
    locales_id: {
      type: "number",
      required: true
    }

  },

};

