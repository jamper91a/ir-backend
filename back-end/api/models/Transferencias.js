/**
	Generated by sails-inverse-model
	Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
*/

module.exports = {
    attributes: {
        creador_id: {
            model: "empleados",
            required: true
        },
        manifiesto: {
            type: "string",
        },
        local_origen_id: {
            model: "locales",
            required: true
        },
        local_destino_id: {
            model: "locales",
            required: true
        },
        estado: {
            type: "number",

        },
        fecha: {
            type: "string"
        },
        mensaje: {
            type: "string"
        }
    }
};