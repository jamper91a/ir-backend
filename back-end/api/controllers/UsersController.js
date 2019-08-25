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
      let epcs, products,productsHasZones, zones, shops, devolutions;
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


        //Obtengo las zonas
        zones = await Zones.find({
          where: {
            shop: _.map(shops, 'id')
          }
        });
        // Obtengo los productos_zona de la compania por zona
        productsHasZones = await ProductsHasZones.find({
          where: {
            zone: _.map(zones, 'id'),
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

  }


};
