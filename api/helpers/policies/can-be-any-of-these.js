module.exports = {


  friendlyName: 'Can be any of these roles',


  description: 'Check if current user have any of the roles described',


  inputs: {
    roles: {
      type: 'ref',
      required: true
    },
    userGroup: {
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,


  fn: function ({roles, userGroup}) {
    for(const role of roles){
      if(role === userGroup)
      {
        return true;
      }
    }
    return false;
  }


};

