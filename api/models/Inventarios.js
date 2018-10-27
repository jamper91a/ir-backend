/**
	Generated by sails-inverse-model
	Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
*/

module.exports = {
    attributes: {
        fecha: {
            type: "string"
        },
        parcial: {
            type: "number",

        },
        colaborativo: {
            type: "number",

        },
        zonas_id: {
            model: "zonas",
            required: true
        },

        //Relaciones
        productos:{
          collection: 'productos',
          via: 'inventarios_id',
          through: 'inventariosProductos'
        },
        users:{
          collection:'empleados',
          via:'inventarios_id',
          through:'usersInventarios'
        }
    }
};
