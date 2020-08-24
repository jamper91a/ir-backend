module.exports = {


  friendlyName: '',


  description: 'Print error on the logs with more information about where the error was generated',


  inputs: {
    error: {
      type: 'ref'
    },
    req: {
      type: 'ref'
    },
    data: {
      type: 'ref',
      required: false,
      defaultsTo: {}
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,


  fn: function ({error, req, data}) {
    if(sails.config.custom.test) {
      let location = '';
      try {
        location = req.options.action;
      } catch (e) {
        location = req;
      }
      sails.log.error(location, data);
      sails.log.error(location, JSON.stringify(error));
    }

  }


};

