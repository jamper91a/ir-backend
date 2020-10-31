module.exports = {


  friendlyName: 'Find employee by username',


  description: '',


  inputs: {
    username: {
      type: 'string',
      required: true
    }
  },


  exits: {
    userNoFound: {
      description: 'User no found',
      responseType: 'badRequest'
    },
    employeeNoFound: {
      description: 'Employee no found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({username}) {

    let things={};
    const user = await Users.findOne({
      where:{
        username: username
      }
    })
      .populate('group');
    if(!user){
      throw 'userNoFound';
    }
    const employee = await Employees.findOne({
      where:{
        user: user.id
      }
    })
      .populate('shop');
    if(employee){
      employee.user = user;
      return {data: employee}
    }else{
      throw 'employeeNoFound';
    }

  }


};
