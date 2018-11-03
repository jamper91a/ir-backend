const _ = require('lodash');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
};

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
const JWT_STRATEGY_CONFIG = {
  secretOrKey: 'k{B^um3fzwP-68cN',
  jwtFromRequest: ExtractJwt.versionOneCompatibility({authScheme: 'Bearer', tokenBodyField: 'access_token'}),
  tokenQueryParameterName: 'access_token',
  session: false,
  ignoreExpiration: true,
  passReqToCallback: true
};

/**
 * Triggers when user authenticates via local strategy
 * @param {Object} req Request object
 * @param {String} username Username from body field in request
 * @param {String} password Password from body field in request
 * @param {Function} next Callback
 * @private
 */
const _onLocalStrategyAuth = (req, username, password, next) => {
  Users
    .findOne({[LOCAL_STRATEGY_CONFIG.usernameField]: username})
    .then(user => {
      if (!user)
        return next(null, false, {code: 'error_G03',message: sails.__('error_G03')});

      bcrypt.compare(password, user.password, function(err, res) {
        if(res) {
          Empleados.findOne({
            users_id: user.id
          })
            .populate("companias_id")
            .populate("locales_id")
            .then(function (empleado) {
              empleado.users_id = user;
              return next(null, empleado, {message: ''});
            })
            .catch(function (err) {
              return next(err);
            });
        }
        else
          return next(null, null, {code: 'error_G04',message: sails.__('error_G04')});

      });


    })
    .catch(next);
};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
const _onJwtStrategyAuth = (req, payload, next) => {
  Empleados
    .findOne({id: payload.empleado_id})
    .populate("users_id")
    .populate("companias_id")
    .populate("locales_id")
    .then(empleado => {
      if (!empleado)
        return next(null, null, sails.config.errors.USER_NOT_FOUND);
      return next(null, empleado, {});
    })
    .catch(next);
};

module.exports = {
  passport: {
    /**
     * Triggers when all Passport steps is done and user profile is parsed
     * @param {Object} req Request object
     * @param {Object} res Response object
     * @param {Object} error Object with error info
     * @param {Object} user User object
     * @param {Object} info Information object
     * @returns {*}
     * @private
     */
    onPassportAuth(req, res, error, empleado, info) {
      if (error || !empleado) return res.negotiate(error || info);

      return res.ok({
        empleado: empleado
      });
    }
  }
};

passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
