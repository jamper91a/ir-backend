module.exports = {


  friendlyName: 'Devolutions by type',


  description: 'Action that will list the devolutions in the system by type (customer or supplier)',


  inputs: {
    firstDate: {
      type: 'string',
      required: true,
      custom: function (date) {
        date = new Date(date);
        return date!='Invalid Date' && _.isDate(date);
      }
    },
    secondDate: {
      type: 'string',
      required: true,
      custom: function (date) {
        date = new Date(date);
        return date!='Invalid Date' && _.isDate(date);
      }
    },
    type: {
      type: 'number',
      required: true,
      custom: function (type) {
        return type===1 || type ===2
      }
    },
    employee: {
      type: 'json',
      required: false,
      defaultsTo: null,
      custom: function (employee) {
        return _.isObject(employee) &&
          _.isObject(employee.shop) &&
          _.isNumber(employee.shop.id) &&
          employee.shop.id>0

      }
    }
  },


  exits: {
    notAllow: {
      description: 'User no allow',
      responseType: 'forbidden'
    }
  },


  fn: async function ({firstDate, secondDate, type, employee}) {

    if(sails.helpers.policies.canBeAnyOfThese(
      [
        sails.config.custom.USERS_GROUP.admin,
        sails.config.custom.USERS_GROUP.Cashier,
        sails.config.custom.USERS_GROUP.warehouse,
      ],
      this.req.user.group)
    ) {
      try {
        let auxEmployee;
        auxEmployee = employee ? employee : this.req.employee;
        let shop = auxEmployee.shop.id;
        //let company = auxEmployee.company.id;

        //Check all the zones of the local
        //Find all zones from the employee's company
        let zones = await Zones.find({
          where: {
            shop: shop
          },
          select: ['id']
        });
        zones = zones.map(z => z.id);
        console.log('zones', zones);

        //Find all devolutions by type
        let devolutions = await Devolutions.find({
          where: {
            type: type
          },
          select: ['id']
        });
        devolutions = devolutions.map(d => d.id);
        let products = await ProductsHasZones.find({
          where: {
            or: [
              //Search all the product that were not transfer,  belongs to the local and the created date is in the range.
              {or: [{wasTransfered: null}, {wasTransfered: 0}], zone: zones, updatedAt: {'>=': firstDate, '<=': secondDate}},
              //Search all the products that were transfer and belongs to the loca and the updated date is in the range
              {wasTransfered: 1, zone: zones, transfer_date: {'>=': firstDate, '<=': secondDate}},
            ],
            devolution: devolutions
          }
        })
          .populate('zone')
          .populate('product&supplier')
          .populate('epc');
        return {data: products};
      } catch (e) {
        sails.helpers.printError({title: 'devolutionsByType', message: e.message}, this.req, this.req.employee);
        throw e;
      }
    } else {
      throw 'notAllow';
    }

  }


};
