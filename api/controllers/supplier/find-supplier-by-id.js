module.exports = {


  friendlyName: 'Find one supplier',


  description: 'Find one supplier by the id. It is used in the front-end by the admin when a supplier is going to be edit',


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
    supplierNotFound: {
      description: 'Supplier not found',
      responseType: 'badRequest'
    },
    companyNotFound: {
      description: 'Company not found',
      responseType: 'badRequest'
    }
  },


  fn: async function ({id, companyId}) {
    const company = this.req.employee.company;
    if(company) {
      //This is just for test to check if not getting products of a different company
      if(sails.config.custom.test && companyId === -1) {
        company.id = 0;
      }
      let supplier;
      supplier = await  Suppliers.findOne({
        where:{
          id: id,
          company: company.id
        }
      });
      if(supplier)
        return {data:supplier};
      else
        throw 'supplierNotFound';
    } else {
      throw 'companyNotFound';
    }


  }


};
