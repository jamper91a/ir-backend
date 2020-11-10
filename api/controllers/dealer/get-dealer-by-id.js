module.exports = {


  friendlyName: 'Get all dealers in the system',


  description: '',


  inputs: {
    id:  {
      type: 'number',
      required: true
    }
  },


  exits: {
    noDealers: {
      description: 'No dealers in the system',
      responseType: 'badRequest'
    }
  },


  fn: async function ({id}) {

    let dealer = await  Dealers.findOne({id: id}).populate('user');

    if(dealer) {
      return {data:dealer};
    } else
      throw 'noDealers';

  }


};
