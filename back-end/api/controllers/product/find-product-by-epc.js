module.exports = {


  friendlyName: 'Find product by epc',


  description: '',


  inputs: {
    code: {
      type: 'string',
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
    epcNotFound: {
      description: 'Epc not found',
      responseType: 'badRequest'
    },
    companyNotFound: {
      description: 'Company not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({code, companyId}) {
    const company = this.req.employee.company;
    if (company) { //Find the epc
      //This is just for test to check if not getting products of a different company
      if(sails.config.custom.test && companyId === -1) {
        company.id = 0;
      }
      let epc = await Epcs.findOne({
        where: {
          epc: code,
          company: company.id
        }
      });

      if (epc) {
        //Find products where producto id and zone match
        let product = await ProductsHasZones.findOne({
          where: {
            epc: epc.id
          }
        })
          .populate('product')
          .populate('zone')
          .populate('epc');
        return {data: {data: product.product}}
      } else {
        throw 'epcNotFound';
      }
    }else {
      throw 'companyNotFound';
    }

  }


};
