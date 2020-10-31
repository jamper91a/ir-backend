module.exports = {


  friendlyName: 'Exits in Array',
  sync:true,
  description: 'Seach an element in array and check if exist',


  inputs: {
    array:{
      type: "ref",
      required: true
    },
    toFind:{
      type: "ref",
      required: true
    }
  },


  fn: function (inputs, exits) {
    var array = inputs.array;
    var toFind = inputs.toFind;

    let finded = array.find(value => value.id === toFind.id);
    return exits.success(finded);

  }


};

