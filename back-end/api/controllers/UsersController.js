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
    console.log("crearEmpleado");
    try {
      if (!req.body.usuario.username || !req.body.usuario.password || !req.body.usuario.groups_id || !req.body.empleado.company || !req.body.empleado.locales_id) {
        console.log("no parameter");
        let things = {code: 'error_G01', req: req, res: res, data: [], error: null};
        return res.generalAnswer(things);

      }
      console.log("no parameter 2");
    } catch (e) {
      console.error(e);
    }
    //Creo usuario
    Users.create(req.body.usuario).fetch().then(function (user) {
      req.body.empleado.users_id = user.id;
      Employees.create(req.body.empleado).fetch().then(function (empleado) {
        res.ok(empleado);
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
  console.log(req.body.last_update);
    try {
      let epcs, productos, productos_zona, zonas, locales;
      //Obtengo los epcs
      epcs = await Epcs.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>': req.body.last_update} : {'>': '2018-01-01'})
        }
      })
        .populate("company");
      // Obtengo los productos de la compania
      productos = await Products.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        }
      })
        .populate("company");

      try {
        //Obtengo las zonas
        zonas = await Zonas.find({
          where: {
            locales_id: req.employee.locales_id.id
          }
        });
        // Obtengo los productos_zona de la compania por zona
        productos_zona = await ProductosZona.find({
          where: {
            zonas_id: _.map(zonas, 'id'),
            updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
          }
        })
          .populate('productos_id')
          .populate('zonas_id')
          .populate('devoluciones_id')
          .populate('epcs_id');
      } catch (e) {
        console.error(e);
      }

      // Obtengo los locales de la compania
      locales = await Locales.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        }
      })
        .populate("company");

      // Obtengo los tipos de devoluciones
      devoluciones = await Devoluciones.find({
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
            productos: productos,
            productos_zona: productos_zona,
            zonas: zonas,
            locales: locales,
            devoluciones: devoluciones
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
