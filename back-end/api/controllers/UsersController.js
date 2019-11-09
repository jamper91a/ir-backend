/**
 * Users
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const passport = require('passport');
const jwt = require('jsonwebtoken');
module.exports = {

  crearEmpleado: function (req, res) {
    try {
      if (!req.body.user.username || !req.body.user.password || !req.body.user.group || !req.body.user.company || !req.body.user.shop) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: null};
        return res.generalAnswer(things);

      }
    } catch (e) {
      console.error(e);
    }
    //Creo usuario
    Users.create(req.body.user).fetch().then(function (user) {
      req.body.employee.user = user.id;
      Employees.create(req.body.employee).fetch().then(function (employee) {
        res.ok(employee);
      }).catch(function (err) {
        let things={code: err.code, req:req, res:res, data:[], error:err, model:"Empleado"};
        return res.generalAnswer(things);
      })
    })
      .catch(function (err) {
        let things={code: err.code, req:req, res:res, data:[], error:err, model:"Users"};
        return res.generalAnswer(things);
      });
  },
  login: function (req, res) {
    passport.authenticate('local', function (err, employee, info) {
      if (err || !employee) {
        return res.badRequest(info);
      }

      req.login(employee, {session: false}, (err) => {
        if (err) {
          res.badRequest(err);
        }
        if (employee) {
          try {
            const token = jwt.sign(
              {
                employee_id: employee.id,
                user_id: employee.user.id,
                username: employee.user.username,
                company_id: employee.company.id,
                shop_id: employee.shop.id
              },
              'k{B^um3fzwP-68cN');
            let data={
              employee: employee,
              token: token
            };

            let things={code: '', req:req, res:res, data:data, error:null};
            return res.generalAnswer(things);
          } catch (e) {
            let things={code: '', req:req, res:res, data:null, error:e};
            return res.generalAnswer(things);
          }


        }
      });


    })(req, res);
  },
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },
  sync: async function (req, res) {
    try {
      let epcs, products,productsHasZones, zones, shops, devolutions, transfers;
      //Obtengo los epcs
      epcs = await Epcs.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>': req.body.last_update} : {'>': '2018-01-01'})
        }
      })
        .populate("company");
      // Obtengo los productos de la compania
      products = await Products.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        }
      })
        .populate("company");

      // Obtengo los locales de la compania
      shops = await Shops.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        }
      })
        .populate("company");

      try {


        //Obtengo todas las zonas
        zones = await Zones.find({
          where: {
            shop: _.map(shops, 'id')
          }
        });

        //Obtengo las zonas del local de este usuario
        zonesThisUser = await Zones.find({
          where: {
            shop: req.employee.shop.id
          }
        });
        // Obtengo los productos_zona de la compania por zona
        productsHasZones = await ProductsHasZones.find({
          where: {
            zone: _.map(zonesThisUser, 'id'),
            updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
          }
        })
          .populate('product')
          .populate('zone')
          .populate('devolution')
          .populate('epc');
      } catch (e) {
        console.error(e);
      }

      //Obtengo las transferencias que van a este local
      transfers = await Transfers.find({
        where:{
          shopDestination: req.employee.shop.id,
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        }
      })
        .populate('products');
      for(const transfer  of transfers){
        //Obtengo los productos de esta transferencia
          const products = await ProductsHasZones.find({
            where: {
              id:_.map(transfer.products, 'product')
            }
          })
            .populate('product')
            .populate('zone')
            .populate('devolution')
            .populate('epc');
          if(products){
            productsHasZones = productsHasZones.concat(products);
          }


      }





      // Obtengo los tipos de devoluciones
      devolutions = await Devolutions.find({
        where: {
          id: {'>': 1},
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        }
      });

      let things = {
        code: '',
        data:
          {
            epcs: epcs,
            products: products,
            productsHasZones: productsHasZones,
            zones: zones,
            shops: shops,
            devolutions: devolutions
          },
        error: null,
        propio: false,
        bd: false
      };
      return res.generalAnswer(things);
    } catch (e) {
      let things = {
        code: 'General error',
        data: {},
        error: e
      };
      return res.generalAnswer(things);
    }

  },
  findEmployeeByUsername: async function (req, res){
    let body = null;
    try {
      body = JSON.parse(req.body);
    } catch (e) {
      body = req.body;
    }
    console.log('findEmployeeByUsername');
    const user = await Users.findOne({
      where:{
        username: body.user.username
      }
    });
    if(user){
      let things={code: '', req:req, res:res, data:user, error:null};
      return res.generalAnswer(things);
    }else{
      let things = {code: 'error_U01', req: req, res: res, data: [], error: null};
      return res.generalAnswer(things);
    }
  },
  modifyEmployeeByUsername: async function (req, res){
    let body = null;
    try {
      body = JSON.parse(req.body);
    } catch (e) {
      body = req.body;
    }
    const user = await Users.findOne({
      where:{
        username: body.user.username
      }
    });
    if(user){
      try{
        await Users.updateOne({id: user.id},body.user);
        await Employees.updateOne({user: user.id}, body.employee);
        let things={code: '', req:req, res:res, data:{}, error:null};
      return res.generalAnswer(things);
      }catch(e){
        let things = {code: '', req: req, res: res, data: [], error: e};
        return res.generalAnswer(things);
      }
      
    }else{
      let things = {code: 'error_U01', req: req, res: res, data: [], error: null};
      return res.generalAnswer(things);
    }
  }


};
