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

    let dealers;
    dealers = await  Dealers.find().populate('user');
    if(justActiveDealers){
      dealers = dealers.filter((dealer)=> { return dealer.user.active});
    } else {
      dealers = await  Dealers.find().populate('user');
    }

    if(dealers) {
      return {data:dealers};
    } else
      throw 'noDealers';

  }


};
