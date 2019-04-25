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
      if (!req.body.usuario.username || !req.body.usuario.password || !req.body.usuario.groups_id || !req.body.empleado.companias_id || !req.body.empleado.locales_id) {
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
      Empleados.create(req.body.empleado).fetch().then(function (empleado) {
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
    passport.authenticate('local', function (err, empleado, info) {
      if (err || !empleado) {
        return res.badRequest(info);
      }

      req.login(empleado, {session: false}, (err) => {
        if (err) {
          res.badRequest(err);
        }
        if (empleado) {
          try {
            const token = jwt.sign(
              {
                empleado_id: empleado.id,
                user_id: empleado.users_id.id,
                username: empleado.users_id.username,
                company_id: empleado.companias_id.id,
                locales_id: empleado.locales_id.id
              },
              'k{B^um3fzwP-68cN');
            let data={
              iu:'uiass',
              empleado: empleado,
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

    let epcs, productos, productos_zona, zonas, locales;
    //Obtengo los epcs
    epcs = await Epcs.find({
      where: {
        companias_id: req.empleado.companias_id.id,
        createdAt: (req.body.last_update ? {'>': req.body.last_update} : {'>': '2018-01-01'})
      }
    })
      .populate("companias_id");
    // Obtengo los productos de la compania
    productos = await Productos.find({
      where:{
        companias_id: req.empleado.companias_id.id,
        updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
      }
    })
      .populate("companias_id");

    try {
      //Obtengo las zonas
      zonas = await Zonas.find({
        where: {
          locales_id: req.empleado.locales_id.id
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
      console.log(e);
    }

    // Obtengo los locales de la compania
        locales = await Locales.find({
          where:{
            companias_id: req.empleado.companias_id.id,
            updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
          }
        })
          .populate("companias_id");

    let things = {
      code: '',
      data:
        {
          epcs: epcs,
          productos: productos,
          productos_zona: productos_zona,
          zonas: zonas,
          locales: locales
        },
      error: null,
      propio: false,
      bd: false
    };
    return res.generalAnswer(things);

  }


};
