"use strict";

/**
 * 500 (Internal Server Error) Response
 *
 * A generic error message, given when no more specific message is suitable.
 * The general catch-all error when the server-side throws an exception.
 */

const _ = require('lodash');

module.exports = function (inputs, config) {
  let req = this.req;
  let res = this.res;
  let sails = req._sails;
  let error=inputs.error ? inputs.error: false;
  let code = inputs.code ? inputs.code: error ? error.code ? error.code:'':' ';
  let data = inputs.data;
  // //Respuesta a enviar al usuario
  // sails.log.info("Code:"+code);
  var answer={
    message: sails.__(code),
    code: code,
    data: data
  };
  // //Desde donde se llama a esta funcion
  let location= req.options.action;

  if(error){
    res.status(500);
  }else{
    res.status(200);
  }
  if(error){
    sails.log.info(location);
    sails.log.info(error);
  }else{
    answer.code='OK';
  }
  res.json(answer);
};
