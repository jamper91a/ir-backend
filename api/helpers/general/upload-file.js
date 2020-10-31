module.exports = {


  friendlyName: '',


  description: 'Upload file to an specific path with a specific name',


  inputs: {
    name: {
      type: 'string',
      description: 'Name to save the file'
    },
    path: {
      type: 'string',
      description: 'Path on asset folder to save the file, it must finish on /'
    },
    file: {
      type: 'ref',
      description: 'File to save'
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const promise = new Promise(function(resolve, reject) {
      try {
        inputs.file.upload(
          {
            maxBytes: 100000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/'+inputs.path),
            saveAs:function(file, cb) {
              cb(null, inputs.name);
            }
          },function whenDone(err, uploadedFiles)
          {
            if (err) {
              reject(err);
            }
            if (uploadedFiles.length === 0){
              reject(err);
            }
            resolve(inputs.path+inputs.name);
          }
        );
      } catch (e) {
        sails.log.error(e);
        throw e;
      }
    });
    return promise.then((url)=>{
      return url;
    },(err)=>{
      sails.logger.error(err);
      throw err;
    });
  }


};

