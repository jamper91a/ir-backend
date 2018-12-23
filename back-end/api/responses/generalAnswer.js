
module.exports = function generalAnswer(inputs) {

  // Get access to `req` and `res`
  let req = this. req;
  let res = this.res;
  let sails = req._sails;
  let error=inputs.error ? inputs.error: false;
  let code = inputs.code ? inputs.code: error ? error.code ? error.code:'':'';
  let data = inputs.data;
  //Respuesta a enviar al usuario
  var answer={
    message: sails.__(code),
    code: code,
    data: data
  };
  //Desde donde se llama a esta funcion
  let location= req.options.action;
  //Error del sistema

  // //Parametro si un error que nosotros controlamos
  // let propio=typeof inputs.propio !== "undefined" ? true : false;
  // //Parametro si es un error nuestro de base de datos
  // let bd=typeof inputs.bd !== "undefined" ? true : false;


  try {
    /*
    if(error && !bd && !propio){
      //En este caso es un errore general del sistema (no de base de datos)
      try {
        answer.message = location + "= " + error.message;
        res.status(401);
      } catch (e) {
        answer.message = location + "= Error tratando de mostrar el mensaje";
        //console.error(answer.message);
        res.status(401);
      }
    }else if(error && bd && !propio){
      //Determino si ese error tiene un codigo, por lo general son errores de base de datos, en este caso se deme enviar
      //un parametro extra, que es el modelo
          //En este caso es un errore general del sistema (no de base de datos)
          switch (error.code){
            case 'E_UNIQUE':
              answer.model= inputs.model;
              res.status(401);
              break;
            case 'UsageError':
              answer.message = error.message;
              answer.model= inputs.model;
              answer.code= error.code;
              res.status(401);
              break;
            default :
              answer.message = sails.__("error_S01");
              answer.model= inputs.model;
              answer.code= 'error_S01';
              res.status(401);
              break;
          }
          //En este caso es un error propio pero que pasa en la bd, entonces muestro el mensaje, pues envie el codigo correcto
    }else if(error && bd && propio){
      try {
        res.status(401);
      } catch (e) {
        answer.message = location + "= Error tratando de mostrar el mensaje";
        res.status(401);
      }
      //En este caso hay un error, pero es propio (envio el error con el fin de depurar despues
    }else if(error && propio){
      try {
        res.status(401);
      } catch (e) {
        answer.message = location + "= Error tratando de mostrar el mensaje";
        res.status(401);
      }
      //Yo lo genere
    }else if(!error && answer.code==''){
      try {
        res.status(401);
      } catch (e) {
        answer.message = location + "= Error tratando de mostrar el mensaje";
        res.status(401);
      }
    //Si no hubieron errores, muestro mensaje de todo bien
    }else{
      res.status(200);
    }*/

    if(error){
      try {
        res.status(401);
      } catch (e) {
        answer.message = location + "= Error tratando de mostrar el mensaje";
        res.status(401);
      }
    }else{
      res.status(200);
    }

  } catch (e) {
    console.error(error);
    answer.message = location + "= " + error.message;
    res.status(401);
  }
  if(error)
    console.error(error);

  res.json(answer);

};
