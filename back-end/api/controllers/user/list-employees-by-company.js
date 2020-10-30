module.exports = {


  friendlyName: 'List employees by company',


  description: 'It is used by the admin on the front end',


  inputs: {
  },


  exits: {
    employeesNotFound: {
      description: 'No employees found',
      responseType: 'badRequest'
    }
  },


  fn: async function () {

    if(!this.req.employee.company){
      const employee = await Employees
        .findOne({user: this.req.user.id})
        .populate("user")
        .populate("company")
        .populate("shop");
      this.req.employee = employee;
    }
    const employees = await Employees.find({
      where:{
        company: this.req.employee.company.id
      }
    })
      .populate('shop')
      .populate('user.group');

    if(employees){
      return {data: employees}
    }else{
      throw 'employeesNotFound';
    }

  }


};
