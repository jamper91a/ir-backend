module.exports = {


  friendlyName: 'Get companies by dealer',


  description: 'Get the companies that a dealer has created',


  inputs: {
    justActive: {
      type: 'boolean',
      description: 'Will get the companies that are active in the system',
      defaultsTo: false
    }
  },


  exits: {
    noDealer: {
      description: 'Dealer not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({justActive}) {
    if(sails.config.custom.rawQueries){
      try {
        const dealer = await sails.helpers.queries.dealer.getByUserId(this.req.user.id);
        const companies = await sails.helpers.queries.dealer.getCompanies(dealer.id, justActive);
        dealer.companies = companies;
        return {data: dealer};
      } catch (e) {
        throw e;
      }
    } else {
       const dealer = await  Dealers.findOne({user: this.req.user.id})
         .populate('user')
       .populate('companies.user');
      if(dealer) {
         if(justActive) {
           dealer.companies = dealer.companies.filter((company)=> { return company.user.active});
         }
        return  {data: dealer};
      } else {
        throw 'noDealer';
      }
    }



  }


};
