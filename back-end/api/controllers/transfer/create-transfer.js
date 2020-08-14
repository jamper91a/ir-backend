module.exports = {


  friendlyName: 'Create transfer',


  description: '',


  inputs: {
    transfer: {
      type: 'json',
      required: true,
      custom: function (transfer) {
        return _.isObject(transfer) &&
          _.isNumber(transfer.shopSource) && transfer.shopSource > 0 &&
          _.isNumber(transfer.shopDestination) && transfer.shopDestination > 0 &&
          transfer.shopSource !== transfer.shopDestination &&
          _.isString(transfer.message)
      }
    },
    products: {
      type: 'json',
      required: true,
      custom: function (products) {
        const isArray = _.isArray(products);
        const allObjects = _.every(products, function (product) {
          return _.isObject(product) &&
            _.isNumber(product.product) && product.product>0 &&
            _.isNumber(product.state)

        });

        return isArray && allObjects && products.length>0;


      }
    }
  },


  exits: {
    productAlreadyTransferred: {
      description: 'Product already transferred',
      responseType: 'badRequest'
    }
  },


  fn: async function ({products, transfer}) {
    return sails.getDatastore()
      .transaction(async (db)=> {

        //Primero creo la transferencia
        transfer.employee=this.req.employee.id;
        //Generate Manifest
        //0 -> First Letter Company
        //1 -> First number from Id Company
        //2 -> First number from Id Local Orig
        //3 -> First number from Id Local Dest
        //4 -> Amount of product
        //5,6,7,8 -> Random text
        transfer.manifest=
          this.req.employee.company.name.substr(0,1)+
          (this.req.employee.company.id+"").substr(0,1)+
          (transfer.shopSource+"").substr(0,1)+
          (transfer.shopDestination+"").substr(0,1)+
          products.length+
          sails.helpers.randomString(5);
        transfer.state=0;
        transfer.employee = this.req.employee.id;
        let newTransfer,productsFromTransfer, things;
        try {
          newTransfer = await Transfers.create(transfer).usingConnection(db).fetch();
        } catch (e) {
          await sails.helpers.printError({title: 'createNewTransfer', message: e.message}, this.req);
          throw e;
        }
        //Una vez creado la transferencia, le asocio los productos
        try {
          products.forEach(ip => ip.transfer = newTransfer.id);
          productsFromTransfer = await TransfersHasZonesProducts.createEach(products).usingConnection(db).fetch();
          return {
            data: {
              transfer:newTransfer,
              products:productsFromTransfer
            }};
        } catch (e) {
          if(e.raw === 'error_PZHT01') {
            throw 'productAlreadyTransferred';
          } else{
            await sails.helpers.printError({title: 'productsFromTransfer', message: e.message}, this.req);
            throw e;
          }

        }
      });

  }


};
