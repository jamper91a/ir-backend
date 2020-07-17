module.exports = {


  friendlyName: 'Find product in local by epc',


  description: 'It is used by the admin of the company in the front end',


  inputs: {
    epc: {
      type: 'string',
      required: true
    },
    //Just for test
    company: {
      type: 'number',
      required: false,
      defaultsTo: 0
    }
  },


  exits: {
    epcNotFound: {
      description: 'Epc not found',
      responseType: 'badRequest'
    },
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


  fn: async function ({epc, company}) {
    try {
      let employee = this.req.employee;

      if (!employee) {
        throw 'employeeNotFound';
      }

      const employeeCompany = this.req.employee.company;
      //Just for test
      if (company !== 0 && sails.config.custom.test) {
        employeeCompany.id = company;
      }

      //Find the epc
      let auxEpc = await Epcs.findOne({
        where: {
          epc: epc
        }
      });

      if (auxEpc) {
        //Find all zones of the company of the empleado
        //Find all zones of the company of the empleado
        let shop = await Shops.findOne({id: employee.shop.id, company: employeeCompany.id}).populate('zone');
        if (!shop) {
          throw 'zonesNotFound';
        }
        let zones = [];
        for (let zone of shop.zone) {
          zones.push(zone.id);
        }

        if (!zones || zones.length === 0) {
          throw 'zonesNotFound';
        }
        //Find productos where productoid and zone match
        let products = await ProductsHasZones.find({
          where: {
            zone: zones,
            epc: auxEpc.id,
            or: [
              {sell: {'<': 2}},
              {sell: null}
            ]
          }
        })
          .populate('product')
          .populate('zone')
          .populate('epc');

        let things = {data: products};
        return things;
      } else {
        throw 'epcNotFound';
      }
    } catch (e) {
      throw e;
    }

  }


};
