module.exports = {


  friendlyName: 'List all products that belongs to a consolidated inventory',


  description: '',


  inputs: {
    consolidatedInventoryId: {
      type: 'number',
      required: true
    }
  },


  exits: {
  },


  fn: async function ({consolidatedInventoryId}) {

    let SQL_DEALER= `
      SELECT
        consolidated_inventories.id,
        consolidated_inventories.createdAt,
        consolidated_inventories.updatedAt,
        consolidated_inventories.name,
        consolidated_inventories.total_products,
        consolidated_inventories.employee_id AS 'employee.id',
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', products_has_zones.id,
            'admission_date', products_has_zones.admission_date,
            'transfer_date', products_has_zones.transfer_date,
            'sell_date', products_has_zones.sell_date,
            'notes_return', products_has_zones.notes_return,
            'logs_users', products_has_zones.logs_users,
            'wasTransfered', products_has_zones.wasTransfered,
            'devolution.id', products_has_zones.devolution_id,
            'sell.id', products_has_zones.sell_id,
            'zone.createdAt', zones__zone.createdAt,
            'zone.updatedAt', zones__zone.updatedAt,
            'zone.id', zones__zone.id,
            'zone.name', zones__zone.name,
            'zone.shop.id', zones__zone.shop_id,
            'epc.createdAt', epcs__epc.createdAt,
            'epc.updatedAt', epcs__epc.updatedAt,
            'epc.id', epcs__epc.id,
            'epc.state', epcs__epc.state,
            'epc.epc', epcs__epc.epc,
            'epc.company.id', epcs__epc.company_id,
            'epc.dealer.id', epcs__epc.dealer_id,
            'product.createdAt', products__product.createdAt,
            'product.updatedAt', products__product.updatedAt,
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
            'product.company.id', products__product.company_id,
            'product.supplier.id', products__product.supplier_id
            )
          ) AS products
      FROM consolidated_inventories
             LEFT OUTER
               JOIN inventories
                    ON consolidated_inventories.id = inventories.consolidated_inventory_id
             LEFT OUTER
               JOIN inventories_has_products AS inventories_has_products__ihp
                    ON inventories.id = inventories_has_products__ihp.inventory_id
             LEFT OUTER
               JOIN products_has_zones
                    ON inventories_has_products__ihp.products_has_zone_id = products_has_zones.id
             LEFT OUTER
               JOIN zones AS zones__zone
                    ON products_has_zones.zone_id = zones__zone.id
             LEFT OUTER
               JOIN epcs AS epcs__epc
                    ON products_has_zones.epc_id = epcs__epc.id
             LEFT OUTER
               JOIN products AS products__product
                    ON products_has_zones.product_id = products__product.id
      WHERE consolidated_inventories.id = $1
      ORDER BY consolidated_inventories.createdAt DESC
     `;

    let ci = await sails.sendNativeQuery(SQL_DEALER, [consolidatedInventoryId]);
    if(ci && ci.rows) {
      ci = ci.rows[0];
      ci.products = JSON.parse(ci.products);
      const products = _.map(ci.products, function (product){
            product.wasTransfered = Boolean(product.wasTransfered);
            return sails.helpers.util.nested(product);
        });
      delete ci['products'];
      ci = sails.helpers.util.nested(ci);
      return {ci, products}
    } else {
      return null;
    }

  }


};

