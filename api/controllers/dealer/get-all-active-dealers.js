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
    dealers = await  Dealers.find().populate('user',{active: true});
    if(dealers) {
      return {data:dealers};
    } else
      throw 'noDealers';

  }


};
