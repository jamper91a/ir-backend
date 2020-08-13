module.exports = {


  friendlyName: 'Difference with inventory erp',


  description: 'Compare local inventory with one erp inventory uploaded by the user.',


  inputs: {
    employee: {
      type: 'json',
      required: false,
      defaultsTo: null,
      custom: function (employee) {
        return _.isObject(employee) &&
          _.isObject(employee.shop) &&_.isNumber(employee.shop.id) && employee.shop.id>0 &&
          _.isObject(employee.company) &&_.isNumber(employee.company.id) && employee.company.id>0

      }
    }
  },


  exits: {
    notAllow: {
      description: 'User no allow',
      responseType: 'forbidden'
    }
  },


  fn: async function ({employee}) {

    if (sails.helpers.policies.canBeAnyOfThese(
      [
        sails.config.custom.USERS_GROUP.admin,
        sails.config.custom.USERS_GROUP.Cashier,
        sails.config.custom.USERS_GROUP.warehouse,
      ],
      this.req.user.group)
    ) {
      try {
        let auxEmployee;
        auxEmployee = employee ? employee : this.req.employee;
        let shop = auxEmployee.shop.id;
        let company = auxEmployee.company.id;
        let total_products_query = `
          SELECT COUNT(1) as total, p.id,p.size, ean, plu, plu2, plu3, description, imagen
          FROM products_has_zones phz, products p, zones z
          WHERE p.company_id = $1 AND phz.product_id = p.id AND phz.zone_id =z.id AND z.shop_id = $2
          GROUP BY p.id, p.size, p.ean, p.plu, p.plu2, p.plu3, description, imagen;`;
        //Get total of every products that has not been sold or transfer
        let allProducts = await sails.sendNativeQuery(total_products_query, [company, shop]);
        let lastInventoryErp = await InventoryErp.find({
          where: {
            shop: shop
          },
          limit: 1,
          sort: 'id DESC'
        });
        if (allProducts && lastInventoryErp) {
          allProducts = allProducts.rows;
          if (lastInventoryErp && lastInventoryErp.length > 0)
            lastInventoryErp = lastInventoryErp[0].products;
          for (let product of allProducts) {
            product.erp = 0;
            for (let erpProduct of lastInventoryErp) {
              if (product.ean === erpProduct.ean ||
                product.plu === erpProduct.plu ||
                product.plu2 === erpProduct.plu2 ||
                product.plu3 === erpProduct.plu3
              ) {
                product.erp = erpProduct.total
              }
            }
          }
        }
        return {data: allProducts}

      } catch (e) {
        await sails.helpers.printError({title: 'differenceWithInvenoryErp', message: e.message}, this.req, this.req.employee);
        throw e;
      }
    } else {
      throw 'notAllow';
    }

  }


};
