module.exports = {


  friendlyName: 'Find zone by id',


  description: 'It is used in the front-end by the admin',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
    //This is just for test to check if not getting products of a different company
    companyId: {
      type: 'number',
      required: false,
      defaultsTo: 0
    }
  },


  exits: {
    zoneNotFound: {
      description: 'Zone not found',
      responseType: 'badRequest'
    },
    companyNotFound: {
      description: 'Company not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({id, companyId}) {
    try {
      const company = this.req.employee.company;
      if(company) {
        //This is just for test to check if not getting products of a different company
        if(sails.config.custom.test && companyId === -1) {
          company.id = 0;
        }
        console.log(companyId);
        const zone = await Zones.findOne({id: id}).populate('shop');
        console.log(zone);
        if(zone && zone.shop.company == company.id){
          return { data: zone};
        } else {
          throw 'zoneNotFound'
        }

      } else {
        throw 'companyNotFound';
      }

    } catch (e) {
      sails.helpers.printError({title: 'findZoneById', message: e.message}, this.req, e);
      throw e;
    }

  }


};
