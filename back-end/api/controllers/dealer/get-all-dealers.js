module.exports = {


  friendlyName: 'Get all dealers in the system',


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

    if(dealers) {
      return {data:dealers};
    } else
      throw 'noDealers';

  }


};
