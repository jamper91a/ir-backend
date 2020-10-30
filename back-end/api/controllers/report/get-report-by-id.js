module.exports = {


  friendlyName: 'Get report by id',


  description: 'Get a report by an id. It is use in the mobile app',


  inputs: {
    id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    reportNoFound: {
      responseType: 'badRequest',
      description: 'Report not found'
    }
  },


  fn: async function ({id}) {
    try {
      console.time('Get Report By Id2');
      const report = await Reports.findOne({
        where: { id }
      })
        .populate('products',{
          where:{
            homologatorEmployee: null
          }
        });
      //Get the products zone
      if(report){
        const productsId = report.products.map(p => p.product);
        const productsZones = await ProductsHasZones.find({
          where:{
            id: productsId
          }
        })
          .populate('zone')
          .populate('epc')
          .populate('product');
        let data = {
          report: report,
          productsHasZones: productsZones
        };
        return data;

      } else{
        throw 'reportNoFound'
      }

    } catch (e) {
      sails.helpers.printError({title: 'getReportsById', message: e.message}, this.req, this.req.employee);
      throw e;
    }

  }


};
