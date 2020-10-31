module.exports = {


  friendlyName: 'Close',


  description: 'Close all sockets of an specific user.',


  inputs: {
    userId: {
      type: "number"
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {

      let user = await User.findOne({id: inputs.userId}).populate('socket');
      if(user){
        if(user.socket && user.socket.length>0){
          sails.log.info('user-'+ user.id);
          _.forEach(user.socket, async function (socket) {
            sails.sockets.leave(socket.socketId, 'user-'+ user.id, function(err) {
              if (err) {
                // If a socket cannot be unsubscribed, ignore it and continue on (but log a warning)
                sails.log.warn('Could not unsubscribe socket `'+socket.socketId+'`.  Error:',err);
              }
              sails.log.info('Socket leaved: '+ socket.socketId);

            });
            //Remove those sockets
            await Socket.destroyOne({id: socket.id});
          });

        }
        return {};
      }
    } catch (e) {
      throw e;
    }
  }


};

