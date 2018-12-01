/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /login': 'Users.login',
  '/logout': 'Users.logout',

  //Mercancia
  'POST /productos/addMercancia': 'ProductosZona.addMercancia',

  //Usuarios
  'POST /users':'Users.crearEmpleado',

  //Inventarios
  'POST /inventarios/crear':'Inventarios.createParcial',
  'POST /inventarios/consolidarParcial':'Inventarios.consolidarParcial'


};
