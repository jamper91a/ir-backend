"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', (error, user, info) => {

    try {
      if (info.name === 'TokenExpiredError') info.status = 401;
      if (info.name === 'JsonWebTokenError') info.status = 401;
      if (error || !user) return res.serverError(error || info);

      req.employee = user;
      req.user = user;

      next();
    } catch (e) {
      res.serverError(e)
    }
  })(req, res);
};
