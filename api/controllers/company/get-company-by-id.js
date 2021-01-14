module.exports = {


  friendlyName: 'Get company by id',


  description: 'Get the company using the id. It is used by the dealers or the company\'s manager',


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
    },
    notAllow: {
      description: 'User not allow',
      responseType: 'forbidden'
    }
  },


  fn: async function ({id}) {
      let filter = {};
      let byId = true;
    let company = null;
      if (!id) {
        filter = {user: this.req.employee.user.id};
        byId = false;
      } else {
        filter = {id};
        //Must be a dealer or admin
        if (this.req.user.group !== sails.config.custom.USERS_GROUP.dealer &&
          this.req.user.group != sails.config.custom.USERS_GROUP.admin) {
          throw 'notAllow';
        }
      }

    if(sails.config.custom.rawQueries){
      try {
        if(byId)
          company = await sails.helpers.queries.company.getById(id);
        else
          company = await sails.helpers.queries.company.getByUserId(this.req.employee.user.id);
      } catch (e) {
        throw e;
      }
    } else {
      company = await Companies.findOne(filter).populate('user');
    }
    if (company) {
      return {data: company};
    } else {
      throw 'noCompany';
    }



  }


};
