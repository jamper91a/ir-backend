module.exports = {


  friendlyName: 'Find Company by user',


  description: '',


  inputs: {
    userId: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    companyNotFound: {
      description: 'Component not found'
    }

  },


  fn: async function ({userId}) {
    const company = await Companies.findOne({user: userId});
    if(company) {
      return company;
    } else {
      throw 'companyNotFound'
    }
  }


};

