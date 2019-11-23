var randomstring = require("randomstring");

module.exports = {


  friendlyName: 'Upload file',


  description: 'Helper to upload a file',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    },
    company:{
      type: 'ref',
      required: true
    },
    name:{
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const company =inputs.company;
    const name = inputs.name;
    const req = inputs.req;
    const photo = req.file('photo');
    const promise = new Promise(function(resolve, reject) {
      var url_photo = "images/companies/"+company.id+"/";
      try {
        var name_file = filename = company.name+"_"+name+"_"+randomstring.generate(3) + "_" + photo._files[0].stream.filename;
        photo.upload(
          {
            maxBytes: 100000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/'+url_photo),
            saveAs:function(file, cb) {
              cb(null, name_file);
            }
          },function whenDone(err, uploadedFiles)
          {
            if (err) {
              resolve('');
            }
            if (uploadedFiles.length === 0){
              resolve('');
            }
            resolve(url_photo+name_file);
          }
        );
      } catch (e) {
        console.error(e);
        exits.success('');
      }
    });
    promise.then((url)=>{
      exits.success(url);
    },(err)=>{
      exits.error(err);
    });
    // return promise;

  }


};

