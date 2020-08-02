module.exports = {


  friendlyName: 'Get reports by type',


  description: 'Return the reports in the db. It is used in the mobile app',


  inputs: {
    //Changed from string to number
    type: {
      type: 'number',
      required: true,
      custom: function (type) {
        return Object.keys(sails.config.custom.REPORT_TYPE).some(function(k) {
          return sails.config.custom.REPORT_TYPE[k] === type;
        });
      }
    }
  },


  exits: {
    reportsNoFound: {
      responseType: 'badRequest',
      description: 'Reports were no foun'
    }
  },


  fn: async function ({type}) {

    try {
      switch (type) {
        case sails.config.custom.REPORT_TYPE.DIFFERENCE_BETWEEN_INVENTORIES:
          //Find all the employees of the company
          const employees = await Employees.find({select: ['id'], where: {company: this.req.employee.company.id}});
          const employeesId = employees.map(a => a.id);
          let reports = await Reports.find({where: {type, employee: employeesId}});
          if(reports) {
            return {data: reports}
          } else{
            throw 'reportsNoFound';
          }
          break;
      }
    } catch (e) {
      await sails.helpers.printError({title: 'getReportsByType', message: e.message}, this.req, this.req.employee);
      throw e;
    }

  }


};
