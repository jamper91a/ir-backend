/**
 * Productos
 *
 * @description :: Server-side logic for managing Productos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  get: async function(req,res){
    let producto, things;
    if(!req.body.codigo){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      producto = await  Productos.findOne({
        where:{
          or:[
            {ean: req.body.codigo},
            {plu: req.body.codigo},

          ]
        }
      }).populate('companias_id');
      if(producto)
        things = {code: '', data: producto, error: null, propio: false, bd: false};
      else
        things = {code: 'error_G06', data: [], error:true};

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  }

};
