var fs = require('fs');
const fse = require('fs-extra');
var moment = require('moment');
module.exports = {


  friendlyName: 'Create pdf',


  description: 'Create a pdf from a report and downloaded it or send to an email',


  inputs: {
    data: {
      type: 'json',
      required: true,
      description: 'Data to be on the pdf'
    },
    templateId: {
      type: 'number',
      required: true,
      description: 'Id of the template from pdfgeneratorapi'
    },
    to: {
      type: 'string',
      required: false,
      isEmail: true,
      defaultsTo: ''
    }
  },


  exits: {

  },


  fn: async function ({data, templateId, to}) {

    try {
      var fileExits = false;
      let jsonData = data;
      const company = await Companies.findOne({id: this.req.employee.company.id});
      jsonData.date = moment(new Date()).format("YYYY-MM-DD");
      jsonData.title = jsonData.title + '-' + jsonData.date;
      jsonData.company = company.name;
      jsonData.logo = "http://coexnort.servehttp.com:8023/" + company.photo;

      //Data to save the file locally
      const fileName = jsonData.title + '.pdf';
      let dirFile = 'assets/pdfs/company/{id}/';
      dirFile = dirFile.replace('{id}', company.id);
      dirFile = dirFile + fileName;
      dirFile = dirFile.replace(/ /g, "_");

      //Check if the report already exists

      try {
        let things = {code: 'Ok', data: dirFile, error: null};
        fileExits = fs.existsSync(dirFile);
        if (fileExits) things.code = 'Already Exits';
        if(!fileExits){
          //Generate the pdf using the helper
          const response = await sails.helpers.generatePdf(this.req, templateId, jsonData);
          const download = Buffer.from(response.response.toString('utf-8'), 'base64');

          //Save the pdf generated locally
          await fse.outputFileSync(dirFile, download);
        }
        //If the report must be send
        if(to && sails.helpers.validateEmail(to)){
          try {
            const response = await sails.helpers.sendEmail(
              this.req,
              to,
              'Inventario Real '+ jsonData.title,
              'Report generated',
              '<b> '+ jsonData.title +'</b>',
              [
                {
                  filename: fileName,
                  path: dirFile
                }


              ]);
            things.message = 'Email sent';
            things.data = response.messageId;
          } catch (e) {
            things.error = e;
          }

          return things;
        }else{
          dirFile = dirFile.replace('assets/','');
          things.data = dirFile;
         return things;
        }

        // dirFile = dirFile.replace('assets/','');

        // setTimeout(function () {
        //   things = {code: 'Ok', data: dirFile, error: null};
        //   return res.generalAnswer(things);
        // }, 1000);


      } catch(err) {
        throw err;
      }



    } catch (e) {
      throw e;
    }

  }


};
