/**
 * Productos
 *
 * @description :: Server-side logic for managing Productos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

  create : async function(req, res){
    let things;
    const company = await Companies.findOne({user: req.employee.user.id});
    try {
      req.body.photo = '';
      if(req.body.withPhoto === 'true'){
        const url_photo = await sails.helpers.uploadFile(req, company, 'logo');
        if (url_photo) {
          req.body.photo = url_photo;
        }
      }
      // const url_photo = await sails.helpers.uploadFile(req, company, 'product');
      // if (url_photo) {
      //   req.body.imagen = url_photo;
        req.body.company = company.id;
        try {
          await Products.create(req.body);
          things = {code: '', data: {}, error: null, propio: false, bd: false};
          return res.generalAnswer(things);
        } catch (e) {
          things = {code: e.number, data: [], error: e, propio: e.propio, bd: e.bd};
          return res.generalAnswer(things);
        }
      // }
    } catch (e) {
      sails.log.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  },

  import : async function(req, res){
    let things;
    const company = await Companies.findOne({user: req.employee.user.id});
    try {
      req.body.products = req.body.products.map((product) => { product.company = company.id; return product});
      sails.getDatastore()
        .transaction(async (db,proceed)=> {


          try {
            //Find or create suppliers
            let noSupplier = await Suppliers.findOne(
              {
                name: 'Sin Proveedor',
                company: company.id
              }).usingConnection(db);
            if(!noSupplier){
              noSupplier = await Suppliers.create({
                name: 'Sin Proveedor',
                company: company.id
              }).usingConnection(db).fetch();
            }

            for(product of req.body.products){
              if(!product.supplier){
                product.supplier = noSupplier.id;
              } else {
                let supplier = await Suppliers.findOne({name: product.supplier, company: company.id}).usingConnection(db);
                if(!supplier){
                  supplier = await Suppliers.create({name: product.supplier, company: company.id}).usingConnection(db).fetch();
                }
                product.supplier = supplier.id;
              }
            }
            await Products.createEach(req.body.products).usingConnection(db).fetch();
            let things = {code: 'OK', req: req, res: res, data: {}, error: null};
            return proceed(null, things);
          } catch (e) {
            let things = {code: '', req: req, res: res, data: {}, error: e};
            return proceed(things);
          }
        })
        .then(function (operation) {
          return res.generalAnswer(operation);
        })
        .catch(function (error) {
          sails.log.error(error.error);
          error = error.raw;
          return res.generalAnswer(error);
        });
    } catch (e) {
      sails.log.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  },

  update : async function(req, res){
    let things;
    const company = await Companies.findOne({user: req.employee.user.id});
    try {
      if(req.body.withPhoto === 'true'){
        const url_photo = await sails.helpers.uploadFile(req, company, 'product');
        if (url_photo) {
          req.body.imagen = url_photo;
        }
      }
      req.body.company = company.id;
      try {
        await Products.updateOne({id: req.body.id}, req.body);
        things = {code: '', data: {}, error: null, propio: false, bd: false};
        return res.generalAnswer(things);
      } catch (e) {
        things = {code: e.number, data: [], error: e, propio: e.propio, bd: e.bd};
        return res.generalAnswer(things);
      }


    } catch (e) {
      sails.log.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  },

  find: async function(req,res){
    let products, things;
    try {
      const company = await Companies.findOne({user: req.employee.user.id});
      products = await  Products.find({
        where:{ company: company.id}
      })
      if(products)
        things = {code: '', data: products, error: null, propio: false, bd: false};
      else
        things = {code: 'error_G06', data: [], error:true};

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },

  findOne: async function(req,res){
    let product, things;
    if(!req.body.code){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      product = await  Products.findOne({
        where:{
          or:[
            {ean: req.body.code},
            {plu: req.body.code},
            {plu2: req.body.code},
            {plu3: req.body.code},

          ]
        }
      }).populate('company');
      if(product)
        things = {code: '', data: product, error: null, propio: false, bd: false};
      else
        things = {code: 'error_G06', data: [], error:true};

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },
  findOneByEpc: async function(req,res){
    let product, things;
    if(!req.body.code){
      let things={code: 'error_G01', data:[], propio:true, bd:false, error:null};
      return res.generalAnswer(things);
    }
    try {
      //Find the epc
      let epc = await Epcs.findOne({
        where:{
          epc: req.body.code
        }
      });

      if(epc){
        //Find productos where productoid and zone match
        let product = await ProductsHasZones.findOne({
          where: {
            epc: epc.id
          }
        })
          .populate('product')
          .populate('zone')
          .populate('epc');

        let things = {code: '', data: product.product, error: null, propio: false, bd: false};
        return res.generalAnswer(things);
      }else{
        let things = {code: 'error_E01', req: req, res: res, data: [], error: new Error("error_E01")};
        return res.generalAnswer(things);
      }

      return res.generalAnswer(things);
    } catch (err) {
      things = {code: err.number, data: [], error: err, propio: err.propio, bd: err.bd};
      return res.generalAnswer(things);
    }
  },


};
