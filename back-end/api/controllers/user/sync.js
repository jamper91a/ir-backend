module.exports = {


  friendlyName: 'Sync',


  description: 'Sync user.',


  inputs: {
    page: {
      type: 'number',
      required: true
    },
    last_update: {
      type: 'string',
      required: false,
      defaultsTo: '2018-01-01'
    }
  },


  exits: {

  },


  fn: async function ({page, last_update}) {

    //Pagination options
    let limit = 5;
    let skip = page * 5;
    try {
      let epcs, products,productsHasZones, zones, shops, devolutions, transfers;
      //Obtengo los epcs
      epcs = await Epcs.find({
        where: {
          company: this.req.employee.company.id,
          updatedAt: (last_update ? {'>': last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      })
        .populate("company");
      // Obtengo los productos de la compania
      products = await Products.find({
        where: {
          company: this.req.employee.company.id,
          updatedAt: (last_update ? {'>=': last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      })
        .populate("company");

      // Obtengo los locales de la compania
      shops = await Shops.find({
        where: {
          company: this.req.employee.company.id,
          updatedAt: (last_update ? {'>=': last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      })
        .populate("company");

      try {
        //Obtengo todas las zonas
        zones = await Zones.find({
          where: {
            shop: _.map(shops, 'id')
          },
          limit,
          skip
        });

        //Obtengo las zonas del local de este usuario
        zonesThisUser = await Zones.find({
          where: {
            shop: this.req.employee.shop.id
          },
          limit,
          skip
        });
        // Obtengo los productos_zona de la compania por zona
        productsHasZones = await ProductsHasZones.find({
          where: {
            zone: _.map(zonesThisUser, 'id'),
            updatedAt: (last_update ? {'>=': last_update} : {'>': '2018-01-01'})
          },
          limit,
          skip
        })
          .populate('product')
          .populate('zone')
          .populate('devolution')
          .populate('epc');
      } catch (e) {
        sails.log.error(e);
      }

      //Obtengo las transferencias que van a este local
      transfers = await Transfers.find({
        where:{
          shopDestination: this.req.employee.shop.id,
          updatedAt: (last_update ? {'>=': last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      })
        .populate('products');
      for(const transfer  of transfers){
        //Obtengo los productos de esta transferencia
        const products = await ProductsHasZones.find({
          where: {
            id:_.map(transfer.products, 'product')
          },
          limit,
          skip
        })
          .populate('product')
          .populate('zone')
          .populate('devolution')
          .populate('epc');
        if(products){
          productsHasZones = productsHasZones.concat(products);
        }


      }





      // Obtengo los tipos de devoluciones
      devolutions = await Devolutions.find({
        where: {
          id: {'>': 1},
          updatedAt: (last_update ? {'>=': last_update} : {'>': '2018-01-01'})
        },
        limit,
        skip
      });

      let things = {
        code: '',
        data:
          {
            epcs: epcs,
            products: products,
            productsHasZones: productsHasZones,
            zones: zones,
            shops: shops,
            devolutions: devolutions,
            page: skip - 1
          },
        error: null,
        propio: false,
        bd: false
      };
      return {
        data:
          {
            epcs: epcs,
            products: products,
            productsHasZones: productsHasZones,
            zones: zones,
            shops: shops,
            devolutions: devolutions,
            page: skip - 1
          }};
    } catch (e) {
      await sails.helpers.printError({title: 'sync', message: e.message}, this.req);
      throw e;
    }

  }


};
