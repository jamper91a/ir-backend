module.exports = {


  friendlyName: 'Create product',


  description: 'Web service that create a product for a company. It is used from the front end by the admin of the company',


  inputs: {
    withPhoto: {
      type: 'boolean',
      required: true
    },
    ean: {
      type: 'string',
      required: true
    },
    plu: {
      type: 'string',
      required: true,
    },
    plu2: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    plu3: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    branch: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    gender: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    color: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    size: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    category: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    supplier: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    amount: {
      type: 'number',
      required: true,
    },
    imagen: {
      type: 'string',
      required: false,
      defaultsTo: ''
    },
    cost_price: {
      type: 'number',
      required: true
    },
    sell_price: {
      type: 'number',
      required: true,
    },
    photo: {
      type: 'ref',
      required: false
    }
  },


  exits: {
    productNoCreated: {
      description: 'Product could not be created',
      responseType: 'serverError'
    },
    companyNotFound: {
      description: 'Company not found',
      responseType: 'badRequest'
    },
    photoNoSaved: {
      description: 'Photo could not be save',
      responseType: 'serverError'
    },
  },


  fn: async function (inputs) {
    const company = await Companies.findOne({user: this.req.employee.user.id});
    if(company) {
        if(inputs.withPhoto){
          const url_photo = await sails.helpers.uploadFile(this.req, company, 'product');
          if (url_photo) {
            inputs.imagen = url_photo;
          } else {
            await sails.helpers.printError({title: 'photoNoSaved', message: e.message}, this.req, inputs);
            throw 'photoNoSaved';
          }
        }
        inputs.company = company.id;
        try {
          await Products.create(inputs);
          return {}
        } catch (e) {
          await sails.helpers.printError({title: 'productNoCreated', message: e.message}, this.req, this.req.employee);
          throw 'productNoCreated';
        }
    } else {
      throw 'companyNotFound';
    }


  }


};
