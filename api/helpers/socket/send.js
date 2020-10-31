module.exports = {


  friendlyName: 'Send',


  description: 'Send socket.',


  inputs: {
    channel: {
      type: "string",
      required: true
    },
    event: {
      type: "string",
      required: true
    },
    data: {
      type: "ref",
      required: true
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.sockets.broadcast(inputs.channel, inputs.event, inputs.data);
    return {};
  }


};

