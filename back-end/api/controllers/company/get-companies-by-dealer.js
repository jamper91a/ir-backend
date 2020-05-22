module.exports = {


  friendlyName: 'Get companies by dealer',


  description: 'Get the companies that a dealer has created',


  inputs: {
    justActive: {
      type: 'boolean',
      description: 'Will get the companies that are active in the system'
    }
  },


  exits: {
    noDealer: {
      description: 'Dealer not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({justActive}) {

    const dealer = await  Dealers.findOne({user: this.req.user.id})
      .populate('user')
      .populate('companies.user');
    if(dealer) {
      if(justActive) {
        dealer.companies = dealer.companies.filter((company)=> { return company.user.active});
      }
      return dealer;
    } else {
      throw 'noDealer';
;    }

  }


};
