module.exports = {



  description: 'Get prodcuts that belong to an inventory',


  inputs: {
    inventoryId:{
      type: 'number',
      required: true
    }
  },


  exits: {
  },


  fn: async function ({inventoryId}) {

    let SQL_DEALER= `
      SELECT

        products_has_zones.id,
        DATE_FORMAT(products_has_zones.createdAt, ${sails.config.custom.dateFormat}) as 'createdAt',
        DATE_FORMAT(products_has_zones.updatedAt, ${sails.config.custom.dateFormat}) as 'updatedAt',
        DATE_FORMAT(products_has_zones.admission_date, ${sails.config.custom.dateFormat}) as 'admission_date',
        DATE_FORMAT(products_has_zones.transfer_date, ${sails.config.custom.dateFormat}) as 'transfer_date',
        DATE_FORMAT(products_has_zones.sell_date, ${sails.config.custom.dateFormat}) as 'sell_date',
        products_has_zones.notes_return,
        products_has_zones.logs_users,
        products_has_zones.wasTransfered,
        products_has_zones.devolution_id as 'devolution.id',
        products_has_zones.sell_id as 'sell.id',
        DATE_FORMAT(zones__zone.createdAt, ${sails.config.custom.dateFormat}) as 'zone.createdAt',
        DATE_FORMAT(zones__zone.updatedAt, ${sails.config.custom.dateFormat}) as 'zone.updatedAt',
        zones__zone.id AS 'zone.id',
        zones__zone.name AS 'zone.name',
        zones__zone.shop_id AS 'zone.shop.id',
        DATE_FORMAT(epcs__epc.createdAt, ${sails.config.custom.dateFormat}) as 'epc.createdAt',
        DATE_FORMAT(epcs__epc.updatedAt, ${sails.config.custom.dateFormat}) as 'epc.updatedAt',
        epcs__epc.id AS 'epc.id',
        epcs__epc.state AS 'epc.state',
        epcs__epc.epc AS 'epc.epc',
        epcs__epc.company_id AS 'epc.company.id',
        epcs__epc.dealer_id AS 'epc.dealer.id',
        DATE_FORMAT(products__product.createdAt, ${sails.config.custom.dateFormat}) as 'product.createdAt',
        DATE_FORMAT(products__product.updatedAt, ${sails.config.custom.dateFormat}) as 'product.updatedAt',
        products__product.id AS 'product.id',
        products__product.ean AS 'product.ean',
        products__product.plu AS 'product.plu',
        products__product.plu2 AS 'product.plu2',
        products__product.plu3 AS 'product.plu3',
        products__product.branch AS 'product.branch',
        products__product.gender AS 'product.gender',
        products__product.color AS 'product.color',
        products__product.size AS 'product.size',
        products__product.category AS 'product.category',
        products__product.description AS 'product.description',
        products__product.amount AS 'product.amount',
        products__product.imagen AS 'product.imagen',
        products__product.cost_price AS 'product.cost_price',
        products__product.sell_price AS 'product.sell_price',
        products__product.company_id AS 'product.company.id',
        products__product.supplier_id AS 'product.supplier.id'
      FROM products_has_zones
        LEFT OUTER JOIN zones AS zones__zone ON products_has_zones.zone_id = zones__zone.id
        LEFT OUTER JOIN epcs AS epcs__epc ON products_has_zones.epc_id = epcs__epc.id
        LEFT OUTER JOIN products AS products__product ON products_has_zones.product_id = products__product.id
        LEFT OUTER JOIN inventories_has_products AS inventories_has_products__ihp ON products_has_zones.id = inventories_has_products__ihp.products_has_zone_id
      WHERE inventories_has_products__ihp.inventory_id = $1`;

    let products = await sails.sendNativeQuery(SQL_DEALER, [inventoryId]);
    if(products && products.rows){
      products = products.rows
      products = _.map(products, function(product){
        product.wasTransfered = Boolean(product.wasTransfered);
        return sails.helpers.util.nested(product);
      });
      return products;
    }

  }


};

