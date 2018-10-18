/**
 * Users
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');
module.exports = {

  crearEmpleado: function (req, res) {
    if (!req.body.usuario.username || !req.body.usuario.password || !req.body.usuario.groups_id || !req.body.empleado.companias_id || !req.body.empleado.locales_id) {
      return res.serverError(
        {
          message: sails.__("error_G01"),
          code: 'error_G01'
        });

    }
    //Creo usuario
    Users.create(req.body.usuario).fetch().then(function (user) {
      console.log(user);
      req.body.empleado.users_id = user.id;
      Empleados.create(req.body.empleado).fetch().then(function (empleado) {
        res.ok(empleado);
      }).catch(function (err) {
        sails.helpers.catchCreate('Empleado', err, res);
      })
    })
      .catch(function (err) {
        sails.helpers.catchCreate('Users', err, res);
      });
  },
  login: function (req, res) {
    passport.authenticate('local', function (err, empleado, info) {
      if (err || !empleado) {
        return res.badRequest(info);
      }

      req.login(empleado, {session: false}, (err) => {
        if (err) {
          res.badRequest(err);
        }
        if (empleado) {
          try {
            const token = jwt.sign(
              {
                empleado_id: empleado.id,
                user_id: empleado.users_id.id,
                username: empleado.users_id.username,
                company_id: empleado.companias_id.id,
                locales_id: empleado.locales_id.id
              },
              'k{B^um3fzwP-68cN');
            return res.ok({
              empleado: empleado,
              token: token
            });
          } catch (e) {
            console.error(e);
          }


        }
      });


    })(req, res);
  },
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  }

};
