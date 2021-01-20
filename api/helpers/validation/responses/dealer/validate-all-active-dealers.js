module.exports = {


  friendlyName: 'Validate active dealers',


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
    allActiveDealersFormatNoValid: {
      description: 'Format no valid',
    },
    allActiveDealersDealersFormatNoValid: {
      description: 'Format no valid',
    },

  },


  fn: async function ({body}) {
    const dateFormatToValid = "YYYY-MM-DDTHH:mm:ss";
    const dealers = body.data;
    if(_.isArray(dealers))
    {
      const allDealersValid = _.every(dealers, function (dealer) {
        const user = dealer.user;

        const dealerValid =
          _.isObject(dealer) &&
          _.isNumber(dealer.id) && dealer.id>0 &&
          _.isString(dealer.name) &&
          sails.helpers.util.validateDate(dealer.createdAt, dateFormatToValid);
        if(!dealerValid){
          console.log('VACD: Dealer no valid');
          console.log(dealer);
          return false;
        }
        const userValid =
          _.isObject(user) &&
          _.isNumber(user.id) && user.id>0 &&
          _.isString(user.name) &&
          _.isString(user.username) &&
          _.isBoolean(user.active) &&
          sails.helpers.util.validateDate(dealer.createdAt, dateFormatToValid) &&
          _.isObject(user.group) && user.group.id > 0;

        if(!userValid){
          console.log('VACD: User no valid');
          console.log(user);
          return false;
        }

        return true;
      });

      if(!allDealersValid){

        throw 'allActiveDealersDealersFormatNoValid';
      }

      return true;

    } else{
      throw 'allActiveDealersFormatNoValid';
    }

  }


};

