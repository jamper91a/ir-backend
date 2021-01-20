module.exports = {


  friendlyName: 'Get all active dealers',


  description: '',


  inputs: {

  },


  exits: {
    noDealers: {
      description: 'No dealers in the system',
      responseType: 'badRequest'
    }
  },


  fn: async function () {
    let dealers;
    if(sails.config.custom.rawQueries){
      try {
        dealers = await sails.helpers.queries.dealer.getAllDealersByUserStatus(true);
      } catch (e) {
        throw e;
      }
    } else {
      dealers = await  Dealers.find().populate('user',{active: true});
    }

    if(dealers) {
      return {data:dealers};
    } else
      throw 'noDealers';

  }


};
