/**
 * Users
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');

module.exports = {

    crearEmpleado: function(req,res){
      if(!req.body.usuario.username || !req.body.usuario.password || !req.body.usuario.groups_id || !req.body.empleado.companias_id || !req.body.empleado.locales_id){
        return res.serverError(
          {
            message:sails.__("error_G01"),
            code:'error_G01'
          });

      }
      //Creo usuario
      Users.create(req.body.usuario).fetch().then(function (user) {
        console.log(user);
        req.body.empleado.users_id=user.id;
        Empleados.create(req.body.empleado).fetch().then(function (empleado) {
          res.ok(empleado);
        }).catch(function (err) {
          sails.helpers.catchCreate('Empleado',err,res);
        })
      })
        .catch(function (err) {
          sails.helpers.catchCreate('Users',err,res);
        });
    },
    login: function(req, res) {
      passport.authenticate('local', function(err, user, info){
        if((err) || (!user)) {
          return res.send({
            message: info.message,
            user
          });
        }
        req.logIn(user, function(err) {
          if(err) res.send(err);
          return res.send({
            message: info.message,
            user
          });
        });
      })(req, res);
    },
    logout: function(req, res) {
      req.logout();
      res.redirect('/');
    }

};
