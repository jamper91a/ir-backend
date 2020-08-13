var moment = require('moment');
module.exports = {


  friendlyName: 'Rotation proyected by ean plu',


  description: '',


  inputs: {
    days: {
      type: 'number',
      required: true,
      custom: function (days) {
        return days>0
      }
    },
    product_id: {
      type: 'number',
      required: true,
      custom: function (product_id) {
        return product_id>0
      }
    },
  },


  exits: {
    notAllow: {
      description: 'User no allow',
      responseType: 'forbidden'
    }
  },


  fn: async function ({days, product_id}) {
    if(sails.helpers.policies.canBeAnyOfThese(
      [
        sails.config.custom.USERS_GROUP.admin,
        sails.config.custom.USERS_GROUP.Cashier,
        sails.config.custom.USERS_GROUP.warehouse,
      ],
      this.req.user.group)
    ) {
      try {

        let firstDate = new Date();
        let secondDate = new Date();
        firstDate = firstDate.setDate(firstDate.getDate()-days);

        firstDate = moment(firstDate).format("YYYY-MM-DD") + " 00:00:00";
        secondDate = moment(secondDate).format("YYYY-MM-DD") + " 23:59:59";

        //Find all products that were sold in those days
        let products  = await ProductsHasZones.find({
          where:{
            sell: {'>':1 },
            product: product_id,
            sell_date: {'>=': firstDate, '<=': secondDate }
          }
        })
          .populate('sell')
          .populate('product');
        return {
          data: products
        }

      } catch (e) {
        await sails.helpers.printError({title: 'rotationProyectedByEanPlu', message: e.message}, this.req, this.req.employee);
        throw e;
      }
    } else {
      throw 'notAllow';
    }


  }


};
