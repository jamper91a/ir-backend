/**
 * Companias
 *
 * @description :: Server-side logic for managing Companias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
const fse = require('fs-extra');
var moment = require('moment');
module.exports = {
  create : async function(req, res){
    try {
      var fileExits = false;
      let jsonData;
      const company = await Companies.findOne({id: req.employee.company.id});
      try {
        jsonData = JSON.parse(req.body.data);
      } catch (e) {
        jsonData = req.body.data;

      }
      const templateId = req.body.templateId;
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
        things = {code: 'Ok', data: dirFile, error: null};
        fileExits = fs.existsSync(dirFile);
        if (fileExits) things.code = 'Already Exits';
        if(!fileExits){
          //Generate the pdf using the helper
          const response = await sails.helpers.generatePdf(req, templateId, jsonData);
          const download = Buffer.from(response.response.toString('utf-8'), 'base64');

          //Save the pdf generated locally
          await fse.outputFileSync(dirFile, download);
        }
        //If the report must be send
        if(req.body.to && sails.helpers.validateEmail(req.body.to)){
          try {
            const response = await sails.helpers.sendEmail(
              req,
              req.body.to,
              'Inventario Real '+ jsonData.title,
              'Report generate',
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

          return res.generalAnswer(things);
        }else{
          dirFile = dirFile.replace('assets/','');
          things.data = dirFile;
          setTimeout(function () {
            return res.generalAnswer(things);
          }, 1000);
        }

        // dirFile = dirFile.replace('assets/','');

        // setTimeout(function () {
        //   things = {code: 'Ok', data: dirFile, error: null};
        //   return res.generalAnswer(things);
        // }, 1000);


      } catch(err) {
        sails.log.error(err);
        things = {code: '', data: [], error: err};
        return res.generalAnswer(things);
      }



    } catch (e) {
      sails.log.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  },

  sendReport: async function(req, res, title, file) {


  }
};
