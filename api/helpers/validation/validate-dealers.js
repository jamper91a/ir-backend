module.exports = {


  friendlyName: 'Validate dealer',


  description: '',


  inputs: {
    dealers: {
        type: 'json',
        required: true
      }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({dealers}) {
    return _.every(dealers, function (dealer) {
      const valid =
        _.isObject(dealer) &&
        _.isNumber(dealer.id) && dealer.id>0 &&
        _.isString(dealer.name) &&
        _.isString(dealer.photo) &&
        _.isNumber(dealer.dealer) && dealer.dealer > 0 &&
        _.isObject(dealer.user);
      if(!valid) {
        console.log('Epc not valid');
        console.log(_.isObject(dealer))
        console.log(_.isNumber(dealer.id))
        console.log(dealer.id>0)
        console.log(_.isNumber(dealer.state))
        console.log(_.isString(dealer.epc))
        console.log(_.isObject(dealer.company))
        console.log(_.isNumber(dealer.company.id))
        console.log(dealer);
      }
      return valid;

    });
  }


};

