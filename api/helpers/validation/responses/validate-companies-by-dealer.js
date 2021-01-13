module.exports = {


  friendlyName: 'Validate companies',


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
    companiesByDealerFormatNoValid: {
      description: 'Format no valid',
    },
    companiesByDealerCompaniesFormatNoValid: {
      description: 'Format no valid',
    },
    companiesByDealerUserFormatNoValid: {
      description: 'Format no valid',
    }

  },


  fn: async function ({body}) {

    const companies = body.data.companies;
    const user = body.data.user;
    if(_.isArray(companies) &&
      _.isNumber(body.data.id) &&
      _.isString(body.data.name) &&
      _.isObject(user))
    {
      const allCompaniesValid = _.every(companies, function (company) {
        const valid =
          _.isObject(company) &&
          _.isNumber(company.id) && company.id>0 &&
          _.isString(company.name) &&
          (_.isString(company.photo) || _.isNull(company.photo)) &&
          _.isObject(company.dealer) && _.isNumber(company.dealer.id) && company.dealer.id > 0 &&
          _.isObject(company.user);
        if(!valid){
          console.log('Company no valid');
          console.log(company);
        }
        return valid;
      });

      const userValid =
        _.isNumber(user.id) && user.id > 0
        _.isString(user.name) &&
        _.isString(user.username) &&
        _.isBoolean(user.active) &&
        _.isObject(user.group) && _.isNumber(user.group.id);

      if(!allCompaniesValid){

        throw 'companiesByDealerCompaniesFormatNoValid';
      }

      if(!userValid){
        console.log('companiesByDealerUserFormatNoValid');
        console.log(user)
        throw 'companiesByDealerUserFormatNoValid';
      }

      return true;

    } else{
      throw 'companiesByDealerFormatNoValid'
    }

  }


};

