module.exports = {


  friendlyName: 'Add socket connection',


  description: '',


  inputs: {
    user: {
      type: 'number',
      required: true
    },
    newSocket: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function ({user, newSocket}) {
    var socketConnections = await Sockets.findOne({user});
    if (socketConnections) {
      await Sockets.update({id: socketConnections.id}).set({sockets: socketConnections.sockets + ';' + newSocket})
    } else {
      await Sockets.create({user, sockets: newSocket});
    }
  }


};

