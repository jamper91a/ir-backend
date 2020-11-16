module.exports = {


  friendlyName: 'Find employee by username',


  description: '',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    //just for test
    companyId: {
      type: 'number',
      required: false
    }
  },


  exits: {
    employeeNoFound: {
      description: 'Employee no found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({id, companyId}) {
    let company = this.req.employee.company.id
    if(sails.config.custom.test && companyId === -1) {
      company = 0;
    }
    let employee = null;
    //Must be find, because if I use findOne I will get error when there is not employee
    employee = await Employees.find({
      where: {
        id: id,
        company: company
      }
    })
      .populate('shop&company&user.group');
      // .populate('shop')
      // .populate('company')
      // .populate('user');
    if(employee && employee[0]){
      employee = sails.helpers.format.formatEmployee(employee[0]);
      return {data: employee}
    }else{
      throw 'employeeNoFound';
    }

  }


};
