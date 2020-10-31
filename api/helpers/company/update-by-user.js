module.exports = {


  friendlyName: 'Update by user',


  description: '',


  inputs: {
    userId: {
      type: 'number',
      required: true
    },
    company: {
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    companyNotUpdated: {
      description: 'Company was not updated because more that one row was fond with that id'
    }

  },


  fn: async function (inputs) {
    const company = await Companies.updateOne({user: inputs.userId}, inputs.company);
    if(company) {
      return company;
    } else {
      throw 'companyNotUpdated';
    }

  }


};

