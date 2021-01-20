module.exports = {


  friendlyName: 'Get all dealers in the system. It is used by the super admin in the web',


  description: '',


  inputs: {
    justActiveDealers:  {
      type: 'boolean',
      required: false,
      defaultsTo: false
    }
  },


  exits: {
    noDealers: {
      description: 'No dealers in the system',
      responseType: 'badRequest'
    }
  },


  fn: async function ({justActiveDealers}) {

    let dealers = [];

    if(sails.config.custom.rawQueries){
      try {
        if(justActiveDealers){
          dealers = await sails.helpers.queries.dealer.getAllDealersByUserStatus(true);
        } else{
          dealers = await sails.helpers.queries.dealer.getAllDealers();
        }

      } catch (e) {
        throw e;
      }
    } else {
      // dealers = await  Dealers.find().populate('user');
      if(justActiveDealers){
        let users = await  Users.find({group: sails.config.custom.USERS_GROUP.dealer, active: true}).populate('dealer');
        _.each(users, function (user) {
          let dealer = user.dealer[0];
          delete user.dealer;
          dealer.user = user;
          dealers.push(dealer);
        });
      } else {
        dealers = await  Dealers.find().populate('user');
      }
    }



    if(dealers) {
      return {data:dealers};
    } else
      throw 'noDealers';

  }


};
