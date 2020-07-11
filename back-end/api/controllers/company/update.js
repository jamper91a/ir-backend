var randomstring = require("randomstring");
module.exports = {


  friendlyName: 'Update',


  description: 'Update company by user.',


  inputs: {
    withPhoto: {
      type: "boolean",
      required: false
    },
    name: {
      type: "string",
      required: false
    },
    photo: {
      type: "ref",
      required: false
    },

  },


  exits: {
    success: {

    },
    companyNotUpdated: {
      description: 'Company could not be update',
      responseType: 'serverError'
    },
    companyNotFound: {
      description: 'Company not found',
      responseType: 'badRequest'
    },

  },


  fn: async function (inputs) {
    const company = await sails.helpers.company.findByUser(this.req.employee.user.id);
    if (company) {
      try {
        if (inputs.withPhoto) {
          inputs.photo = this.req.file('photo');
          //Generate path to save the photo
          const path = "images/companies/" + company.id + "/";
          //Generate name to save the photo
          var name = company.name + "_logo_" + randomstring.generate(3) + "_" + inputs.photo._files[0].stream.filename;
          const url_photo = await sails.helpers.general.uploadFile(name, path, inputs.photo);
          company.photo = url_photo
        }
        const companyUpdated = await sails.helpers.company.updateByUser(this.req.employee.user.id, {
          name: inputs.name,
          photo: company.photo
        });
        return {data: companyUpdated};
      } catch (e) {
        await sails.helpers.printError({title: 'companyNotUpdated', message: e.message}, this.req, inputs);
        throw 'companyNotUpdated';
      }
    } else {
      throw 'companyNotFound';
      }
  }


};
