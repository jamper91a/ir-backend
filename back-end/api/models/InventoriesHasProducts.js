/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {
  attributes: {
    inventory: {
      model: "inventories",
      columnName: "inventory_id",
    },
    epc: {
      model: "epcs",
      unique: true,
      columnName: "epc_id",
    },
    zone: {
      model: 'zones',
      required: true,
      columnName: "zone_id",
    },

    //Relaciones muchos a muchos
    product: {
      model: "products_has_zones",
      columnName: "products_has_zone_id",
    },
  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.inventory == "number")
      this.inventory = {
        id: this.inventory
      };
    if (typeof this.epc == "number")
      this.epc = {
        id: this.epc
      };
    if (typeof this.zone == "number")
      this.zone = {
        id: this.zone
      };
    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  },
  /**
   * Antes de ingresar un producto a un inventario, debo validar:
   * Que el producto exista.
   * Que la zona del producto concuerde con la zona del inventario.
   * Que el estado del epc sea valido (1, lo que significa que se asigno y no se ha usado
   * @param valuesToSet
   * @param proceed
   */
  beforeCreate: function (valuesToSet, proceed) {

    ProductsHasZones.find({
      id: valuesToSet.product
    })
      .populate('epc')
      .then(function (productZone) {
        //Si el producto existe
        if (productZone && productZone.length > 0) {
          //Si la zona del proucto es la misma a la que se le va a asignar
          if (true) {
            //Si el epc del producto esta habilitado
            if (productZone[0].epc.state == 1) {
              return proceed();
            } else {
              var err = new Error();
              err.bd = true;
              err.propio = true;
              err.number = 'error_IP03';
              return proceed(err);
            }
          } else {
            var err = new Error();
            err.bd = true;
            err.propio = true;
            err.number = 'error_IP02';
            return proceed(err);
          }
        } else {

          var err = new Error();
          err.bd = true;
          err.propio = true;
          err.number = 'error_IP01';
          return proceed(err);
        }
      }).catch(function (err) {
      err.bd = false;
      err.propio = false;
      err.number = 'error_IP03';
      return proceed(err);
    });

  },
  tableName: 'inventories_has_products'
};
