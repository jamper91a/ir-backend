module.exports = {


  friendlyName: 'Validate company',


  description: '',


  inputs: {
      body: {
        type: 'ref',
        required: true
      }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    companyByIdFormatNoValid: {
      description: 'Format no valid',
    },
    companyByIdUserFormatNoValid: {
      description: 'Format no valid',
    },
    companyByIdDealerFormatNoValid: {
      description: 'Format no valid',
    }

  },


  fn: async function ({body}) {

    const company = body.data;
    const user = body.data.user;
    const dealer = body.data.dealer
    if(
      _.isNumber(company.id) && company.id>0 &&
      _.isString(company.name) &&
      (_.isString(company.photo) || _.isNull(company.photo)) &&
      _.isObject(dealer) &&
      _.isObject(user))
    {

      const userValid =
        _.isNumber(user.id) && user.id > 0 &&
        _.isString(user.name) &&
        _.isString(user.username) &&
        _.isNumber(user.active) &&
        _.isObject(user.group) && _.isNumber(user.group.id);

      const dealerValid =
        _.isNumber(dealer.id) && user.id > 0


      if(!userValid){
        console.log('companyByIdUserFormatNoValid');
        console.log(company);
        throw 'companyByIdUserFormatNoValid';
      }
      if(!dealerValid){
        console.log('companyByIdDealerFormatNoValid');
        console.log(company);
        throw 'companyByIdDealerFormatNoValid';
      }

      return true;

    } else{
      throw 'companiesByDealerFormatNoValid'
    }

  }


};

