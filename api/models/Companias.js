/**
	Generated by sails-inverse-model
	Date:Sun Oct 07 2018 11:23:28 GMT+1300 (NZDT)
*/

module.exports = {
    attributes: {
        name: {
            type: "string",

        },

      //Relaciones
        empleados:{
          collection: "empleados",
          via: "companias_id"
        }
    }
};
