module.exports = {


  friendlyName: 'Random string',
  sync:true,
  description: 'Generate a random string with the lenght provided',


  inputs: {
    size:{
      type: "number",
      example: 5,
      required: true
    }
  },


  fn: function (inputs, exits) {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < inputs.size; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    // All done.
    return exits.success(text);

  }


};

