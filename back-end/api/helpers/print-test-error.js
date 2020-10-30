module.exports = {


  friendlyName: '',


  description: 'Print error on the logs with more information about where the error was generated',


  inputs: {
    error: {
      type: 'ref',
      required: true
    },
    res: {
      type: 'ref',
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function ({error,res}) {
    sails.log.error('Printing error');
    sails.log.error('exit', res.res.headers['x-exit']);
    sails.log.error('description', res.res.headers['x-exit-description']);
    sails.log.error('body', res.body);
    sails.log.error('error', error);
    sails.log.error('Printing error');
  }
};

