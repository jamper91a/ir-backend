module.exports = {


  friendlyName: 'Get company by id',


  description: 'Get the company using the id',


  inputs: {
    id: {
      type: 'number',
      required: false,
      description: 'Company\'s id. If is not given will use the id on the session'
    }
  },


  exits: {
    noCompany: {
      description: 'Company not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({id}) {
    if(!id){
      id = this.req.employee.user.id;
    }
    let company = await Companies.findOne({id}).populate('user');
    if(company) {
      return company;
    } else {
      throw 'noDealer';
    }

  }


};
