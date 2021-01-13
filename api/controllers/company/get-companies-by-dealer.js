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
     //  const SQL_DEALER= `
     //  SELECT dealers.id ,
     //         dealers.name ,
     //         dealers.createdAt ,
     //         dealers.updatedAt ,
     //         ${sails.config.custom.dbName}.groups.id as 'groups.id',
     //         users.id as 'users.id',
     //         users.createdAt as 'users.createdAt',
     //         users.updatedAt as 'users.updatedAt',
     //         users.name as 'users.name',
     //         users.username as 'users.username',
     //         users.active as 'users.active'
     //  FROM dealers,
     //       users,
     //       ${sails.config.custom.dbName}.groups
     //  WHERE users.id = $1 and
     //    users.id = dealers.user_id and
     //    ${sails.config.custom.dbName}.groups.id = users.group_id;
     // `;
     //
     //  let dealer = await sails.sendNativeQuery(SQL_DEALER, [ this.req.user.id, sails.config.custom.dbName]);
     //  if(dealer && dealer.rows && dealer.rows[0]) {
     //    dealer = dealer.rows[0];
     //    // if(justActive) {
     //    //   dealer.companies = dealer.companies.filter((company)=> { return company.user.active});
     //    // }
     //
     //    const nested = sails.helpers.util.nested(dealer);
     //    return  {data: nested};
     //  } else {
     //    throw 'noDealer';
     //  }
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
