module.exports = {



  description: 'Get products that belong to an inventory',


  inputs: {
    inventoryId:{
      type: 'number',
      required: true
    }
  },


  exits: {
  },


  fn: async function ({inventoryId}) {

    let SQL_DEALER= `SELECT
        inventories.id,
        DATE_FORMAT(inventories.date,'%Y-%m-%d %H:%i:%s') AS 'date',
        inventories.parcial,
        inventories.collaborative,
        inventories.message,
        DATE_FORMAT(inventories.createdAt,'%Y-%m-%d %H:%i:%s') AS 'createdAt',
        DATE_FORMAT(inventories.updatedAt,'%Y-%m-%d %H:%i:%s') AS 'updatedAt',
        zones.id AS 'zone.id',
        zones.name AS 'zone.name',
        zones.shop_id AS 'zone.shop.id',
        DATE_FORMAT(zones.createdAt,'%Y-%m-%d %H:%i:%s') AS 'zone.createdAt',
        DATE_FORMAT(zones.updatedAt,'%Y-%m-%d %H:%i:%s') AS 'zone.updatedAt',
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', products_has_zones.id,
            'admission_date', DATE_FORMAT(products_has_zones.admission_date,'%Y-%m-%d %H:%i:%s'),
            'transfer_date', DATE_FORMAT(products_has_zones.transfer_date,'%Y-%m-%d %H:%i:%s'),
            'sell_date', DATE_FORMAT(products_has_zones.sell_date,'%Y-%m-%d %H:%i:%s'),
            'notes_return', products_has_zones.notes_return,
            'logs_users', products_has_zones.logs_users,
            'wasTransfered', products_has_zones.wasTransfered,
            'devolution.id', products_has_zones.devolution_id,
            'createdAt', DATE_FORMAT(products_has_zones.createdAt,'%Y-%m-%d %H:%i:%s'),
            'updatedAt', DATE_FORMAT(products_has_zones.createdAt,'%Y-%m-%d %H:%i:%s'),

            'product.id', products__product.id,
            'product.ean', products__product.ean,
            'product.plu', products__product.plu,
            'product.plu2', products__product.plu2,
            'product.plu3', products__product.plu3,
            'product.branch', products__product.branch,
            'product.gender', products__product.gender,
            'product.color', products__product.color,
            'product.size', products__product.size,
            'product.category', products__product.category,
            'product.description', products__product.description,
            'product.amount', products__product.amount,
            'product.imagen', products__product.imagen,
            'product.cost_price', products__product.cost_price,
            'product.sell_price', products__product.sell_price,
            'product.createdAt', DATE_FORMAT(products__product.createdAt,'%Y-%m-%d %H:%i:%s'),
            'product.updatedAt', DATE_FORMAT(products__product.updatedAt,'%Y-%m-%d %H:%i:%s'),
            'product.company.id', products__product.company_id,
            'product.supplier.id', products__product.supplier_id,

            'zone.id', zones__zone.id,
            'zone.name', zones__zone.name,
            'zone.shop.id', zones__zone.shop_id,
            'zone.createdAt', DATE_FORMAT(zones__zone.createdAt,'%Y-%m-%d %H:%i:%s'),
            'zone.updatedAt', DATE_FORMAT(zones__zone.updatedAt,'%Y-%m-%d %H:%i:%s'),

            'devolution.id', devolutions.id,
            'devolution.name', devolutions.name,
            'devolution.type', devolutions.type,
            'devolution.createdAt', DATE_FORMAT(devolutions.createdAt,'%Y-%m-%d %H:%i:%s'),
            'devolution.updatedAt', DATE_FORMAT(devolutions.updatedAt,'%Y-%m-%d %H:%i:%s'),


            'sell.id', sells.id,
            'sell.createdAt', DATE_FORMAT(sells.createdAt,'%Y-%m-%d %H:%i:%s'),
            'sell.updatedAt', DATE_FORMAT(sells.updatedAt,'%Y-%m-%d %H:%i:%s'),
            'sell.user.id', sells.user_id,

            'epc.id', epcs__epc.id,
            'epc.state', epcs__epc.state,
            'epc.epc', epcs__epc.epc,
            'epc.createdAt', DATE_FORMAT(epcs__epc.createdAt,'%Y-%m-%d %H:%i:%s'),
            'epc.updatedAt', DATE_FORMAT(epcs__epc.updatedAt,'%Y-%m-%d %H:%i:%s'),
            'epc.company.id', epcs__epc.company_id,
            'epc.dealer.id', epcs__epc.dealer_id
            )
          ) AS products
      FROM inventories
             LEFT OUTER JOIN inventories_has_products AS inventories_has_products__ihp
                    ON inventories.id = inventories_has_products__ihp.inventory_id
             LEFT OUTER JOIN products_has_zones
                    ON inventories_has_products__ihp.products_has_zone_id = products_has_zones.id
             LEFT OUTER JOIN zones AS zones__zone
                    ON products_has_zones.zone_id = zones__zone.id
            LEFT OUTER JOIN devolutions
                    ON products_has_zones.devolution_id = devolutions.id
             LEFT OUTER JOIN epcs AS epcs__epc
                    ON products_has_zones.epc_id = epcs__epc.id
            LEFT OUTER JOIN sells
                    ON products_has_zones.sell_id = sells.id
            LEFT OUTER JOIN products AS products__product
                    ON products_has_zones.product_id = products__product.id
            LEFT OUTER JOIN zones
                    ON inventories.zone_id =  zones.id
      WHERE inventories.id = $1
      `;

    let inventory = await sails.sendNativeQuery(SQL_DEALER, [inventoryId]);
    if(inventory && inventory.rows && inventory.rows.length>0){
      inventory = inventory.rows[0];
      inventory.products = JSON.parse(inventory.products);
      inventory.products = _.map(inventory.products, function(product){
        product.wasTransfered = Boolean(product.wasTransfered);
        return sails.helpers.util.nested(product);
      });
      return sails.helpers.util.nested(inventory);
    }

  }


};

