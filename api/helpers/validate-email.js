module.exports = {


  friendlyName: 'Validate Email',
  sync: true,
  description: 'Validate that a string is a valid email address',
  inputs: {
    email: {
      type: 'string',
      description: 'Email to validate',
      required: true
    }
  },
  fn: function (inputs, exits) {
    try {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var validation = re.test(String(inputs.email).toLowerCase());
      if (validation)
        exits.success(true);
      else
        exits.error(false);
    } catch (e) {
      console.error(e);
      exits.error(false);
    }
    // exits.error(err);

  }


};

