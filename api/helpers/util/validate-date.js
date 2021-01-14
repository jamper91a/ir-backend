var moment = require('moment');
module.exports = {


  description: 'Validate if string is a date',


  inputs: {
    date: {
      type: 'string',
      allowNull: true
    },
    format: {
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,


  fn: function ({date, format}) {
    if(date){
      const result = moment(date, format, false).isValid();
      return result;
    } else
      return false

  }


};

