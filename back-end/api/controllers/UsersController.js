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
      req.body.user = JSON.parse(req.body.user);
      req.body.employee = JSON.parse(req.body.employee);
    } catch (error) {

    }

    try {
      if (!req.body.user.username || !req.body.user.password || !req.body.user.group || !req.body.employee.company || !req.body.employee.shop) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);

      }
    } catch (e) {
      sails.log.error(e);
    }
    //Creo usuario
    req.body.user.active = 1;
    Users.create(req.body.user).fetch().then(function (user) {
      req.body.employee.user = user.id;
      Employees.create(req.body.employee).fetch().then(function (employee) {
        let things={code: 'OK', req:req, res:res, data:employee, error:null};
        return res.generalAnswer(things);
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
  createAdmin: async function (req, res) {
    //Get the dealer
    try {
      req.body.user = JSON.parse(req.body.user);
      req.body.employee = JSON.parse(req.body.employee);
    } catch (error) {

    }

    try {
      if (!req.body.user.username || !req.body.user.password || !req.body.employee.company.name) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);

      }
    } catch (e) {
      sails.log.error(e);
    }

      sails.getDatastore()
        .transaction(async (db,proceed)=> {
          // await TransfersHasZonesProducts.update(_.map(products, 'id'), {state: 1}).usingConnection(db);
          try {
            const dealer = await Dealers.findOne({user: req.user.id});
            //Creo usuario
            req.body.user.active = 1;
            req.body.user.group = 2;
            const user = await Users.create(req.body.user).fetch().usingConnection(db);
            req.body.employee.company.dealer = dealer.id;
            req.body.employee.company.user= user.id;
            const company = await Companies.create(req.body.employee.company).fetch().usingConnection(db);
            const shop = await Shops.create({name: company.name, company: company.id}).fetch().usingConnection(db);
            req.body.employee.user = user.id;
            req.body.employee.company = company.id;
            req.body.employee.shop = shop.id;
            const employee = await Employees.create(req.body.employee).fetch().usingConnection(db);
            employee.user = user;
            employee.company = company;
            let things = {code: 'OK', req: req, res: res, data: employee, error: null};
            // return res.generalAnswer(things);
            return proceed(null, things);
          } catch (e) {
            let things={code: e.code, req:req, res:res, data:[], error:e, model:"Users"};
            return proceed(e, things);
          }
        })
        .then(function (operation) {
          return res.generalAnswer(operation);
        })
        .catch(function (error) {
          sails.log.error(error);
          error = error.raw;
          return res.generalAnswer(error);
        });
  },
  updateAdmin: async function (req, res) {
    //Get the dealer
    try {
      req.body.user = JSON.parse(req.body.user);
      req.body.employee = JSON.parse(req.body.employee);
    } catch (error) {

    }

    try {
      if (!req.body.user.username) {
        let things = {code: 'error_G01', req: req, res: res, data: [], error: new Error("error_G01")};
        return res.generalAnswer(things);
      }
    } catch (e) {
      sails.log.error(e);
    }

    sails.getDatastore()
      .transaction(async (db,proceed)=> {

        try {
          const user = await Users.updateOne({username: req.body.user.username}, req.body.user).usingConnection(db);
          const company = await Companies.updateOne({user: user.id}, req.body.employee.company).usingConnection(db);

          let things = {code: 'OK', req: req, res: res, data: {}, error: null};
          // return res.generalAnswer(things);
          return proceed(null, things);
        } catch (e) {
          let things={code: e.code, req:req, res:res, data:[], error:e, model:"Users"};
          return proceed(e);
        }
      })
      .then(function (operation) {
        return res.generalAnswer(operation);
      })
      .catch(function (error) {
        sails.log.error(error);
        error = error.raw;
        return res.generalAnswer(error);
      });
  },
  login: function (req, res) {
    passport.authenticate('local', function (err, employee, user, info) {
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
  loginWeb: function (req, res) {
    passport.authenticate('local', function (err, employee, user, info) {
      if (err) {
        return res.badRequest(info);
      }
      if(user == null && employee != null){
        user = employee.user;
      }

      if(!user){
        return res.forbidden();
      }
        req.login(user, {session: false}, async (err) => {
          if (err) {
            res.badRequest(err);
          }
          if (user) {
            /**
             * Populate info depending of the group
             * Just groups 1, 2 and 5 are allow (sAdmin, admin and dealer)
             */
            sails.log.info(user.group);
            if(user.group == 1 || user.group == 2 || user.group == 5){
              const dealer = await Dealers.findOne({user: user.id});
              try {
                const token = jwt.sign(
                  {
                    user_id: user.id
                  },
                  'k{B^um3fzwP-68cN');
                let data={
                  user: user,
                  dealer: dealer,
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
          }else{
            return res.forbidden();
          }
        });



    })(req, res);
  },
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },
  sync: async function (req, res) {
    //Pagination options
    let limit = 5;
    let skip = req.body.page * 5;
    console.log('page', req.body.page);
    try {
      let epcs, products,productsHasZones, zones, shops, devolutions, transfers;
      //Obtengo los epcs
      epcs = await Epcs.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>': req.body.last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      })
        .populate("company");
      // Obtengo los productos de la compania
      products = await Products.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      })
        .populate("company");

      // Obtengo los locales de la compania
      shops = await Shops.find({
        where: {
          company: req.employee.company.id,
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      })
        .populate("company");

      try {
        //Obtengo todas las zonas
        zones = await Zones.find({
          where: {
            shop: _.map(shops, 'id')
          },
          limit,
          skip
        });

        //Obtengo las zonas del local de este usuario
        zonesThisUser = await Zones.find({
          where: {
            shop: req.employee.shop.id
          },
          limit,
          skip
        });
        // Obtengo los productos_zona de la compania por zona
        productsHasZones = await ProductsHasZones.find({
          where: {
            zone: _.map(zonesThisUser, 'id'),
            updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
          },
          limit,
          skip
        })
          .populate('product')
          .populate('zone')
          .populate('devolution')
          .populate('epc');
      } catch (e) {
        sails.log.error(e);
      }

      //Obtengo las transferencias que van a este local
      transfers = await Transfers.find({
        where:{
          shopDestination: req.employee.shop.id,
          updatedAt: (req.body.last_update ? {'>=': req.body.last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      })
        .populate('products');
      for(const transfer  of transfers){
        //Obtengo los productos de esta transferencia
          const products = await ProductsHasZones.find({
            where: {
              id:_.map(transfer.products, 'product')
            },
            limit,
            skip
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
        },
        limit,
        skip
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
            devolutions: devolutions,
            page: skip - 1
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
    let things={};
    sails.log.info('findEmployeeByUsername');
    const user = await Users.findOne({
      where:{
        username: req.body.username
      }
    })
    .populate('group');
    if(!user){
      things = {code: 'error_U01', req: req, res: res, data: [], error: new Error("error_U01")};
      return res.generalAnswer(things);
    }
    const employee = await Employees.findOne({
      where:{
        user: user.id
      }
    })
    .populate('shop');
    if(employee){
      employee.user = user;
      things={code: '', req:req, res:res, data:employee, error:null};
      return res.generalAnswer(things);
    }else{
      things = {code: 'error_E01', req: req, res: res, data: [], error: new Error("error_E01")};
      return res.generalAnswer(things);
    }
  },
  modifyEmployeeByUsername: async function (req, res){
    try {
      req.body.user = JSON.parse(req.body.user);
      req.body.employee = JSON.parse(req.body.employee);
    } catch (error) {

    }
    const user = await Users.findOne({
      where:{
        username: req.body.user.username
      }
    });
    if(user){
      try{
        await Users.updateOne({id: user.id},req.body.user);
        await Employees.updateOne({user: user.id}, req.body.employee);
        let things={code: '', req:req, res:res, data:{}, error:null};
      return res.generalAnswer(things);
      }catch(e){
        let things = {code: '', req: req, res: res, data: [], error: e};
        return res.generalAnswer(things);
      }

    }else{
      let things = {code: 'error_U01', req: req, res: res, data: [], error: new Error("error_U01")};
      return res.generalAnswer(things);
    }
  },
  listEmployeesByCompany: async function(req, res){
    let things = {};
    if(!req.employee.company){
      const employee = await Employees
        .findOne({user: req.user.id})
        .populate("user")
        .populate("company")
        .populate("shop");
      req.employee = employee;
    }
    const company = req.employee.company.id;
    const employees = await Employees.find({
      where:{
        company: company
      }
    })
    .populate('shop')
    .populate('user.group');

    if(employees){
      things={code: '', req:req, res:res, data:employees, error:null};
    }else{
      things={code: 'error_U02', req:req, res:res, data:{}, error:new Error("error_U02")};
    }
    return res.generalAnswer(things);
  },
  changeEmployeeState: async function(req, res){
    let things = {}
    try {
      const username = req.body.username;
      const active = req.body.active;
      await Users.updateOne({username: username},{active: active});
      things={code: '', req:req, res:res, data:{}, error:null};
    } catch (e) {
      things = {code: '', req: req, res: res, data: [], error: e};
    }

    return res.generalAnswer(things);

  }


};
