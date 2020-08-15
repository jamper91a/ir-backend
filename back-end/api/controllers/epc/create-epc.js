module.exports = {


  friendlyName: 'Create epc',


  description: 'Create several epc in the system',


  inputs: {
    epcs: {
      type: 'json',
      required: true,
      custom: function(epcs) {
        const isArray = _.isArray(epcs);
        const allObjects = _.every(epcs, function (epc) {
          return _.isString(epc.epc) &&
            _.isNumber(epc.dealer) &&
            _.isNumber(epc.company) &&
            _.isNumber(epc.state)

        });
        return isArray && allObjects;
      }
    }
  },


  exits: {
    epcNotValid: {
      description: 'Epc already used',
      responseType: 'badRequest'
    }
  },


  fn: async function ({epcs}) {
    let pos = 0;
    for(let epc of epcs){
      epc.state = 0;
      epc.epc = epc.epc.replace(/[^A-Za-z0-9]/gi, '');
      if(!epc.epc){
        epcs.splice(pos, 1);
      }
      pos++;
    }
    await sails.getDatastore()
      .transaction(async (db)=> {

        try {
          await Epcs.createEach(epcs).usingConnection(db);
          return {data:{}}
        } catch (e) {
          if(e.code === 'E_UNIQUE') {
            throw 'epcNotValid';
          } else {
            await sails.helpers.printError({title: 'epcsNoCreate', message: e.message}, this.req);
            throw e;
          }

        }
      });

  }


};
