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
      const company = await Companies.findOne({user: req.employee.user.id});
      const jsonData = req.body.data;
      const templateId = req.body.templateId;
      jsonData.title = jsonData.title;
      jsonData.date = moment(new Date()).format("YYYY-MM-DD");
      jsonData.company = company.name;
      jsonData.logo = "http://coexnort.servehttp.com:8023/" + company.photo;

      console.log(jsonData);
      const response = await sails.helpers.generatePdf(req, templateId, jsonData);

      const download = Buffer.from(response.response.toString('utf-8'), 'base64');
      const fileName = jsonData.title + '.pdf';
      let dirFile = 'assets/pdfs/company/{id}/';
      dirFile = dirFile.replace('{id}', company.id);
      dirFile = dirFile + fileName;
      dirFile = dirFile.replace(/ /g, "_");

      await fse.outputFileSync(dirFile, download);
      dirFile = dirFile.replace('assets/','');

      setTimeout(function () {
        things = {code: 'Ok', data: dirFile, error: null};
        return res.generalAnswer(things);
      }, 1000);


    } catch (e) {
      sails.log.error(e);
      things = {code: '', data: [], error: e};
      return res.generalAnswer(things);
    }
  },
};
