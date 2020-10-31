module.exports = {


  friendlyName: 'Add commodity',


  description: 'This web service will link several epc with a product and a zone. It is used in the mobile app',


  inputs: {
    products: {
      type: 'json',
      required: true,
      custom: function(products) {
        const isArray = _.isArray(products);
        const allObjects = _.every(products, function (product) {
          return _.isNumber(product.zone) &&
            _.isNumber(product.product) &&
            _.isString(product.epc) &&
            _.isNumber(product.devolution) &&
            _.isNumber(product.sell)

        });
        return isArray && allObjects;
      }
    },
    product: {
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
    productsNoCreated: {
      description: 'Products could not be create',
      responseType: 'badRequest'
    },
    productNotFound: {
      description: 'Product to be associated not found',
      responseType: 'badRequest'
    },
    epcUsed: {
      description: 'Epc used',
      responseType: 'badRequest'
    },
    epcNotFound: {
      description: 'Epc not found',
      responseType: 'badRequest'
    },
    companyNotFound: {
      description: 'Company not found',
      responseType: 'badRequest'
    },
  },


  fn: async function ({products, product, companyId}) {

    return await sails.getDatastore()
      .transaction(async (db)=>{
        const company = this.req.employee.company;

        if(company) {
          /**
           * Find product to associate
           */
          let productToAssociate = await Products.findOne({where: {id: product, company: company.id}}).usingConnection(db);
          if(productToAssociate) {
            /**
             * Find all the epcs of the products using the epcCode
             */
            //This is just for test to check if not getting products of a different company
            if(sails.config.custom.test && companyId === -1) {
              company.id = 0;
            }
            let epcs = await Epcs.find({where: {epc: _.map(products, 'epc'), company: company.id, state: 0}}).usingConnection(db);
            for(let newProduct of products){
              let epcFound = epcs.find(epc =>  { return epc.epc === newProduct.epc});
              if(epcFound){
                newProduct.epc = epcFound.id;
                newProduct.product = productToAssociate.id;
                newProduct.devolution = 1;
                newProduct.sell = 1;
              } else {
                sails.helpers.printError(
                  {title: 'epcNotFound', message: 'Epc ' + newProduct.epc},
                  this.req,
                  {company: company.id, epc: newProduct.epc});
                throw 'epcNotFound';
              }
            }
            /**
             * Create the new products zone
             */
            try{
              await ProductsHasZones.createEach(products).usingConnection(db);
            }catch (e) {
              sails.helpers.printError({title: 'productsNoCreated'},this.req, e);
              throw 'productsNoCreated';
            }
            /**
             * Update epc state to do not be able to use again
             */
            try {
              epcs = await Epcs.update(_.map(products, 'epc_id'), {state: 1}).usingConnection(db).fetch();
              let data = {
                product: productToAssociate,
                epcs
              };
              return {data: data};
            } catch (err) {
              sails.helpers.printError({title: 'epcUsed'},this.req,{epcs: _.map(newProducts, 'epc_id')});
              throw 'epcUsed';
            }
          } else {
            throw 'productNotFound';
          }
        } else {
          throw 'companyNotFound'
        }
      });

  }


};
