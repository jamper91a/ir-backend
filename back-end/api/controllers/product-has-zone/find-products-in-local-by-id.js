module.exports = {


  friendlyName: 'Find product in local by ean plu',


  description: 'It is used by the admin of the company in the front end',


  inputs: {
    product: {
      type: 'number',
      required: true
    },
    employee: {
      type: 'ref',
      required: false,
      defaultsTo: null,
      custom: function (employee) {
        return  _.isObject(employee) &&
          _.isObject(employee.shop) &&
          _.isNumber(employee.shop.id) && employee.shop.id>0;
      }
    },
    //Just for test
    company: {
      type: 'number',
      required: false,
      defaultsTo: 0
    }
  },


  exits: {
    employeeNotFound: {
      description: 'Employee not found',
      responseType: 'badRequest'
    },
    zonesNotFound: {
      description: 'Zones not found',
      responseType: 'badRequest'
    },
    productsNotFound: {
      description: 'Zones not found',
      responseType: 'badRequest'
    },
  },


  fn: async function ({product, employee, company}) {
    try {
      if (employee === null) {
        employee = this.req.employee
      }

      if (!employee) {
        throw 'employeeNotFound';
      }

      const employeeCompany = this.req.employee.company;
      //Just for test
      if (company !== 0 && sails.config.custom.test) {
        employeeCompany.id = company;
      }

      //Find all zones of the company of the empleado
      let shop = await Shops.findOne({id: employee.shop.id, company: employeeCompany.id}).populate('zone');
      if(!shop) {
        throw 'zonesNotFound';
      }
      let zones = [];
      for(let zone of shop.zone) {
        zones.push(zone.id);
      }

      if (!zones || zones.length === 0) {
        throw 'zonesNotFound';
      }
      //Find productos where productoid and zone match
      let products = await ProductsHasZones.find({
        where: {
          product: product,
          zone: zones,
          or:[
            {sell: {'<': 2}},
            {sell: null}
          ]
        }
      })
        .populate('product')
        .populate('zone')
        .populate('epc');
      if(!products || products.length === 0 ){
        throw 'productsNotFound'
      }
      return {data: products};
      return {data: []};
    } catch (e) {
      throw e;
    }

  }


};
