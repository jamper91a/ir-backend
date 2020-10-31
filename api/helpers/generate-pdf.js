var PDFGeneratorAPI = require("pdf-generator-api");

module.exports = {


  friendlyName: 'Generate Pdf',


  description: 'Generate a pdf using the provider',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    },
    template:{
      type: 'string',
      required: true
    },
    jsonData:{
      type: 'ref'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let Client = new PDFGeneratorAPI(
      '9e482d34a153b68f5084e49a1ab84d2e6f0c50ac0d484d0ef29a13da7c9e1d94',
      '2faeba2347fb3bef501a41881983775bed32c37ddc0569b82fc7a06b3b31aef0'
    );
    Client.setBaseUrl('https://us1.pdfgeneratorapi.com/api/v3/');
    Client.setWorkspace('jamper91@hotmail.com');
    const template =inputs.template;
    const jsonData = inputs.jsonData;

    Client.output(template, jsonData).then(function(response) {
      exits.success(response);
    });

    // exits.error(err);

  }


};

