module.exports = {


  friendlyName: 'Sale units',


  description: '',


  inputs: {
    firstDate: {
      type: 'string',
      required: true,
      custom: function (date) {
        date = new Date(date);
        return date!='Invalid Date' && _.isDate(date);
      }
    },
    secondDate: {
      type: 'string',
      required: true,
      custom: function (date) {
        date = new Date(date);

        return date!='Invalid Date' && _.isDate(date);
      }
    },
  },


  exits: {
    notAllow: {
      description: 'User no allow',
      responseType: 'forbidden'
    }
  },


  fn: async function ({firstDate, secondDate}) {
    if(sails.helpers.policies.canBeAnyOfThese(
      [
        sails.config.custom.USERS_GROUP.admin,
        sails.config.custom.USERS_GROUP.Cashier,
        sails.config.custom.USERS_GROUP.warehouse,
      ],
      this.req.user.group)
    ) {
      try {
        //Remove time in case is include
        let aux = firstDate.split("T")[0];
        firstDate = aux + " 00:00:00";
        aux = secondDate.split("T")[0];
        secondDate = secondDate + " 23:59:59";


        //Check all the zones of the local
        //Find all zones from the employee's company
        let zones = await Zones.find({
          where: {
            shop: this.req.employee.shop.id
          },
          select: ['id']
        });
        console.log('Find in zones');
        zones = zones.map(z => z.id);
        let products = await ProductsHasZones.find({
          where:{
            or:[
              //Search all the product that were not transfer,  belongs to the local and the created date is in the range.
              {
                or:[{wasTransfered: null}, {wasTransfered:0}],
                zone: zones,
                updatedAt: {'>=': firstDate, '<=': secondDate }
                },
              //Search all the products that were transfer and belongs to the local and the updated date is in the range
              {wasTransfered: 1, zone: zones, transfer_date: {'>=': firstDate, '<=': secondDate }},
            ]
          }
        }).populate('zone')
          .populate('product')
          .populate('epc');


        let saleUnits = [];
        let returnedUnits = [];

        for(const product of products) {
          if(product.sell>1){
            if(!sails.helpers.existInArray(saleUnits, product))
              saleUnits.push(product);
          }else{
            if(product.devolution>1){
              if(!sails.helpers.existInArray(returnedUnits, product))
                returnedUnits.push(product);
            }
          }
        }

        const data = {
          saleUnits: saleUnits,
          returnedUnits: returnedUnits
        };
        return {data};
      } catch (e) {
        sails.helpers.printError({title: 'saleUnits', message: e.message}, this.req, this.req.employee);
        throw e;
      }
    } else {
      throw 'notAllow';
    }


  }


};
