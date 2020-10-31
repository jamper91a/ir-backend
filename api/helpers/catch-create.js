module.exports = {

  friendlyName: 'Errores al crear',
  description: 'Se encarga de manejar los errores al momento de crear un elemento',
  sync: true,
  inputs: {

    model:{
      type:'string',
      required:true,
      description:'Nombre del modelo donde se hace el create'
    },
    error: {
      type: 'ref',
      description: 'El error al crear',
      required: true
    },
    res: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    }

  },


  fn: function (inputs, exits) {
    var err=inputs.error;
    var res= inputs.res;
    switch (err.code){
      case 'E_UNIQUE':
        res.badRequest({
          message: sails.__("error_G02"),
          code:"error_G02",
          model:inputs.model
        });
        break;
      case 'UsageError':
        res.badRequest({
          message: err.message,
          code:err.code,
          model:inputs.model
        });
        break;
      default :
        res.serverError({
          message:sails.__("error_S01"),
          code:'error_S01',
          model:inputs.model,
          error: err.message
        });
        break;
    }
    return exits.success('');
  }

};
