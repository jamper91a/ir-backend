module.exports = {


  friendlyName: 'Save report',


  description: 'Save a report after check the difference between inventories, It is used on the mobile app. There are' +
    'tow type of reports, there are on REPORT_TYPE',


  inputs: {
    products:{
      type: 'json',
      required: true,
      custom: function(products) {
        const isArray = _.isArray(products);
        const allObjects = _.every(products, function (product) {
          return _.isNumber(product.product) && product.product>0

        });
        return isArray && allObjects;
      }
    },
    report: {
      type: 'json',
      required: true,
      custom: function (report) {
         const isObject =_.isObject(report);
         if(!isObject)
           return false;
          const type = _.isNumber(report.type) && (Object.values(sails.config.custom.REPORT_TYPE).indexOf(report.type) >= 0);
          let reports = true, dates = true, amount = true, units_returned = true, units_sell = true;
          if(report.type === sails.config.custom.REPORT_TYPE.SELL_UNITS) {
            dates = report.firstDate &&_.isDate(new Date(report.firstDate)) && report.secondDate &&_.isDate(new Date(report.secondDate));
            report.firstInventory = 1;
            report.secondInventory = 1;

          } else if(report.type === sails.config.custom.REPORT_TYPE.DIFFERENCE_BETWEEN_INVENTORIES) {
            reports =_.isNumber(report.firstInventory) && _.isNumber(report.secondInventory);
            amount = _.isNumber(report.amount) && report.amount >0;
            units_returned = _.isNumber(report.units_returned);
            units_sell = _.isNumber(report.units_sell);
          }

          //Change name of columns
          report.inventory_first_id = report.firstInventory;
          report.inventory_second_id = report.secondInventory;
            return isObject && type && reports && dates && amount && units_returned && units_sell
      }
    }
  },


  exits: {

  },


  fn: async function ({products, report}) {

    return await sails.getDatastore()
      .transaction(async (db)=> {

        try {
          report.employee = this.req.employee.id;
          let newReport= await Reports.create(report).usingConnection(db).fetch();
          // Asocio los productos al reporte reciente creado
          products.forEach(pz => pz.report = newReport.id);
          await ReportsHasProductsZones.createEach(products).usingConnection(db);
          return {}
        } catch (e) {
          sails.helpers.printError({title: 'save-report'},this.req, e);
          throw e;
        }

      });

  }


};
