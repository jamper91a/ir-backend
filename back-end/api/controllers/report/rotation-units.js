module.exports = {


  friendlyName: 'Rotation units',


  description: 'Action that will return the info about unit rotate. It is use in the mobile app. It can also be use on ' +
    'admin page by the manager',


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


  fn: async function ({firstDate, secondDate, employee}) {


      if(sails.helpers.policies.canBeAnyOfThese(
        [
          sails.config.custom.USERS_GROUP.admin,
          sails.config.custom.USERS_GROUP.Cashier,
          sails.config.custom.USERS_GROUP.warehouse,
        ],
        this.req.user.group)
      ) {

        try{
          firstDate =firstDate + " 00:00:00";
          secondDate =secondDate + " 23:59:59";

          console.log(firstDate);
          console.log(secondDate);

          let auxEmployee = employee ? employee : this.req.employee;
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
          let products = await ProductsHasZones.find({
            where:{
              or:[
                //Search all the product that were not transfer,  belongs to the local and the created date is in the range.
                {or:[{wasTransfered: null}, {wasTransfered:0}], zone: zones, createdAt: {'>=': firstDate, '<=': secondDate }},
                //Search all the products that were transfer and belongs to the local and the updated date is in the range
                {wasTransfered: 1, zone: zones, transfer_date: {'>=': firstDate, '<=': secondDate }},
              ]
            }
          })
            .populate('zone')
            .populate('product')
            .populate('epc');
          return {data: products}
        }catch (e) {
          await sails.helpers.printError({title: 'rotationUnits', message: e.message}, this.req, this.req.employee);
          throw e;
        }

      }else {
        throw 'notAllow';
      }

  }


};
