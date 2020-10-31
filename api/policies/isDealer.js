"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */


module.exports = (req, res, next) => {
  if(req.user.group === sails.config.custom.USERS_GROUP.dealer) {
    return next();
  }
  return res.forbidden();

};
