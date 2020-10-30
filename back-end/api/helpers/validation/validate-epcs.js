module.exports = {


  friendlyName: 'Validate epc',


  description: '',


  inputs: {
      epcs: {
        type: 'json',
        required: true
      }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({epcs}) {
    return _.every(epcs, function (epc) {
      const valid =
        _.isObject(epc) &&
        _.isNumber(epc.id) &&
        epc.id>0 &&
        _.isNumber(epc.state) &&
        _.isString(epc.epc) &&
        _.isObject(epc.company) &&
        _.isNumber(epc.company.id);
      if(!valid) {
        console.log('Epc not valid');
        console.log(_.isObject(epc))
        console.log(_.isNumber(epc.id))
        console.log(epc.id>0)
        console.log(_.isNumber(epc.state))
        console.log(_.isString(epc.epc))
        console.log(_.isObject(epc.company))
        console.log(_.isNumber(epc.company.id))
        console.log(epc);
      }
      return valid;

    });
  }


};

