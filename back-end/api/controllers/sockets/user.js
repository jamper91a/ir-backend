module.exports = {


  friendlyName: 'Connect to my socket',


  description: 'This action allow the user to connect to his own channel to receive notifications ',


  inputs: {
  },


  exits: {

  },


  fn: async function () {

    try {
      if (!this.req.isSocket) {
        return this.res.badRequest();
      }
      if(this.req.user){
        sails.sockets.join(this.req, 'user-'+this.req.user.id);
        const socketId = sails.sockets.getId(this.req);
        //Save the socketId to disconnect in the future
        await sails.helpers.sockets.addSocketConnection (this.req.user.id, socketId);
        console.log('Socket created');
        return 'Connected to my socket: ' + this.req.user.id;
      }else{
        return this.res.badRequest();
      }


    } catch (e) {
      sails.log.error(e);
      throw {serverError: e};
    }

  }


};
