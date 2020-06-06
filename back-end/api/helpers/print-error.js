module.exports = {


  friendlyName: '',


  description: 'Print error on the logs with more information about where the error was generated',


  inputs: {
    error: {
      type: 'ref'
    },
    req: {
      type: 'ref'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({error, req}) {
    let location= req.options.action;
    sails.log.error(location, JSON.stringify(error));
  }


};

