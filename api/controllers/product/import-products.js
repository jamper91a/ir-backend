module.exports = {


  friendlyName: 'Import products',


  description: 'Web service that would allow to create several products at the same time. It would be used in the front-end.' +
    'It is used by the company\'s manager',


  inputs: {
    products: {
      type: 'json',
      required: true,
      custom: function(products) {
        const isArray = _.isArray(products);
        let objectError;
        const allObjects = _.every(products, function (product) {
          const val = _.isString(product.ean) &&
           _.isString(product.plu) &&
            //If there is not supplier, we give one when the product is created
           // _.isNumber(product.supplier) && product.supplier>1 &&
           _.isNumber(product.amount) && product.amount>0 &&
           _.isNumber(product.cost_price) && product.cost_price>0 &&
           _.isNumber(product.sell_price) && product.sell_price>0 &&
            product.sell_price>product.cost_price
          if(!val){
            objectError = product;
          }
          return val;

        });
        if(!isArray){
          sails.log.error('Error importing file, it is not an array');
        }
        if(!allObjects){
          sails.log.error('No all object pass validation');
          sails.log.error(objectError);
        }
        return isArray && allObjects;
      }
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
  },


  fn: async function ({products}) {
    const company = this.req.employee.company;
    if(company) {
      products = products.map((product) => { product.company = company.id; return product});
      return await sails.getDatastore()
        .transaction(async (db)=> {
          try {
            //Find or create suppliers
            let noSupplier = await Suppliers.findOne({
              name: 'Sin Proveedor',
              company: company.id
            }).usingConnection(db);
            if(!noSupplier){
              noSupplier = await Suppliers.create({
                name: 'Sin Proveedor',
                company: company.id
              }).usingConnection(db).fetch();
            }

            //Find all the supliers of this company
            let allSupliers = await Suppliers.find({company: company.id}).usingConnection(db);
            for(let product of products){
              if(!product.supplier){
                product.supplier = noSupplier.id;
              } else {
                let supplier = null;
                if(allSupliers){
                  supplier = allSupliers.find(supplier =>  { return supplier.name === product.supplier});
                }
                if(!supplier){
                  supplier = await Suppliers.create({name: product.supplier, company: company.id}).usingConnection(db).fetch();
                  allSupliers.push(supplier);
                }
                product.supplier = supplier.id;
              }
            }
            await Products.createEach(products).usingConnection(db).fetch();
            return {};
          } catch (e) {
            sails.helpers.printError({title: 'productNoCreated', message: e.message}, this.req, products);
            throw 'productNoCreated';
          }
        });
    } else {
      throw 'companyNotFound';
    }


  }


};
