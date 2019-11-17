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
const _onLocalStrategyAuth = async (req, username, password, next) => {

  try {
    let user = await Users.findOne({[LOCAL_STRATEGY_CONFIG.usernameField]: username});
    if (!user)
      return next(null, false, {code: 'error_G03',message: sails.__('error_G03')});

    bcrypt.compare(password, user.password, async function(err, res) {
      if(res) {
        //console.log(user.id);
        try {
          const employee = await Employees.findOne({user: user.id}).populate("company").populate("shop");
          if (employee) {
            employee.user = user;
            return next(null, employee, null, {message: ''});
          } else {
            return next(null, null, user, {message: ''});
          }
        } catch (e) {
          return next(err);
        }
        // Employees.findOne({
        //   user: user.id
        // })
        //   .populate("company")
        //   .populate("shop")
        //   .then(function (employee) {
        //     employee.user = user;
        //     return next(null, employee, {message: ''});
        //   })
        //   .catch(function (err) {
        //     return next(err);
        //   });
      }
      else
        return next(null, null, {code: 'error_G04',message: sails.__('error_G04')});

    })
  }catch (e) {
    console.error(e);
    next(e);
  }

};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
const _onJwtStrategyAuth = async (req, payload, next) => {
  if(payload.employee_id){
    Employees
      .findOne({id: payload.employee_id})
      .populate("user")
      .populate("company")
      .populate("shop")
      .then(employee => {
        if (!employee)
          return next(null, null, sails.config.errors.USER_NOT_FOUND);
        return next(null, employee, {});
      })
      .catch(next);
  }else if(payload.user_id) {
    try {
      const user = await Users.findOne({id: payload.user_id});
      if(user){
        return next(null, user, {});
      }else{
        return next(null, null, sails.config.errors.USER_NOT_FOUND);
      }
    } catch (e) {
      return next(null, null, e);
    }
  }



};

module.exports = {
  passport: {
    onPassportAuth(req, res, error, employee, info) {
      if (error || !employee) return res.negotiate(error || info);

      return res.ok({
        employee: employee
      });
    }
  }
};

passport.use(new LocalStrategy(_.assign({}, LOCAL_STRATEGY_CONFIG), _onLocalStrategyAuth));
passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
