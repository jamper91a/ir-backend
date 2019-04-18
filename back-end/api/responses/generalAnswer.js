
module.exports = function generalAnswer(inputs) {

  console.log("Error");
  // Get access to `req` and `res`
  let req = this.req;
  let res = this.res;
  let sails = req._sails;
  let error=inputs.error ? inputs.error: false;
  let code = inputs.code ? inputs.code: error ? error.code ? error.code:'':' ';
  let data = inputs.data;
  // //Respuesta a enviar al usuario
  // console.log("Code:"+code);
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
    console.log(location);
    console.log(error);
  }else{
    answer.code='OK';
  }
  res.json(answer);
  // req.ok();

};
