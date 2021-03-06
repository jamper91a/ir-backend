"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */


module.exports = (req, res, next) => {
  if(req.user.group === sails.config.custom.USERS_GROUP.Cashier) {
    return next();
  }
  if(req.user.group === sails.config.custom.USERS_GROUP.warehouse) {
    return next();
  }
  return res.forbidden();

};
