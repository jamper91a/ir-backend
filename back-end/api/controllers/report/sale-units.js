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

  },


  fn: async function ({firstDate, secondDate}) {

    try {

      firstDate = firstDate + " 00:00:00";
      secondDate = secondDate + " 23:59:59";


      //Check all the zones of the local
      //Find all zones from the employee's company
      let zones = await Zones.find({
        where: {
          shop: this.req.employee.shop.id
        },
        select: ['id']
      });
      zones = zones.map(z => z.id);
      let products = await ProductsHasZones.find({
        where:{
          or:[
            //Search all the product that were not transfer,  belongs to the local and the created date is in the range.
            {
              or:[
                {wasTransfered: null}, {wasTransfered:0}
              ], zone: zones, createdAt: {'>=': firstDate, '<=': secondDate }},
            //Search all the products that were transfer and belongs to the local and the updated date is in the range
            {wasTransfered: 1, zone: zones, transfer_date: {'>=': firstDate, '<=': secondDate }},
          ]
        }
      });


      let saleUnits = [];
      let returnedUnits = [];
      //Search for the products of the first inventory in the second inventory

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
      await sails.helpers.printError({title: 'saleUnits', message: e.message}, this.req, this.req.employee);
      throw e;
    }

  }


};
