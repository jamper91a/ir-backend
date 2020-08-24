var moment = require('moment');
module.exports = {


  friendlyName: 'Create sell',


  description: '',


  inputs: {
    sell: {
      type: 'json',
      required: true,
      custom: function (sell) {
        return _.isObject(sell) &&
          _.isNumber(sell.user) && sell.user>0

      }
    },
    products: {
      type: 'ref',
      required: true,
      custom: function (products) {
        const isArray = _.isArray(products);
        const allObjects = _.every(products, function (product) {
          return _.isObject(product) &&
            _.isNumber(product.id) && product.id>0 &&
            _.isNumber(product.product_id) && product.product_id>0

        });

        return isArray && allObjects;


      }
    }
  },


  exits: {
    productsNoValid: {
      description: 'One of the products has been already sold',
      responseType: 'badRequest'
    }
  },


  fn: async function ({sell, products}) {

    //Validate data

    return await sails.getDatastore()
      .transaction(async (db)=> {
        //First I validate that none of the products was sell before
        const productsId = _.map(products, 'id');
        const aux = await ProductsHasZones.find({
          where: {
            id: productsId,
            sell: {
              '>': 0
            }
          }
        }).usingConnection(db);
        if(aux.length === 0) {
          //Primero creo la venta
          sell.user = this.req.employee.user.id;
          let newSell;
          try {
            newSell = await Sells.create(sell).usingConnection(db).fetch();
          } catch (e) {
            sails.helpers.printError({title: 'createSell', message: e.message}, this.req);
            return e;
          }
          try {
            const saleHistory = [];
            products.forEach(product => {
              product.sell = {id: newSell.id};
              saleHistory.push({
                user:this.req.employee.user.id,
                product: product.product_id,
                productsHasZone: product.id
              });
            });
            const sellDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
            await ProductsHasZones.update({id: productsId}, {sell: newSell.id, devolution: 1, sell_date: sellDate}).usingConnection(db);
            await SalesHistory.createEach(saleHistory).usingConnection(db);

            return {data: products}

          } catch (e) {
            sails.helpers.printError({title: 'createSell', message: e.message}, this.req);
            return e;
          }
        } else {
          throw 'productsNoValid';
        }



      });

  }


};
