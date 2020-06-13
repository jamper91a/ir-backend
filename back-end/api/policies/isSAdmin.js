"use strict";

/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */


module.exports = (req, res, next) => {
  console.log('isSadmin', req.user.group);
  if(req.user.group === sails.config.custom.USERS_GROUP.sAdmin) {
    return next();
  }
  return res.forbidden();

};
