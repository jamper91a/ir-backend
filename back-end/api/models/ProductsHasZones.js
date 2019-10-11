/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */
var moment = require('moment');
module.exports = {

  attributes: {
    admission_date: {
      type: 'ref', columnType: 'datetime', autoCreatedAt: true
    },
    transfer_date: {
      type: 'ref', columnType: 'datetime'
    },
    sell_date: {
      type: 'ref', columnType: 'datetime'
    },
    notes_return: {
      type: "string",
      allowNull: true
    },
    logs_users: {
      type: "string",
      allowNull: true
    },
    wasTransfered: {
      type: "boolean",
      allowNull: true,
      defaultsTo: false
    },
    product: {
      model: "Products",
      required: true,
      columnName: "product_id"
    },
    zone: {
      model: "zones",
      columnName: "zone_id",
      required: true
    },
    devolution: {
      model: "devolutions",
      columnName: "devolution_id",
      required: false
    },
    sell: {
      model: "sells",
      columnName: "sell_id",
      required: false
    },
    epc: {
      model: "epcs",
      columnName: "epc_id",
      required: true,
      unique: true
    },

    //Relaciones muchos a muchos
    inventories: {
      collection: 'inventories',
      via: 'product',
      // via: 'product',
      through: 'InventoriesHasProducts'
    }

  },
  customToJSON: function () {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if (typeof this.epc == "number")
      this.epc = {
        id: this.epc
      };
    if (typeof this.sell == "number")
      this.sell = {
        id: this.sell
      };
    if (typeof this.devolution == "number")
      this.devolution = {
        id: this.devolution
      };
    if (typeof this.zone == "number")
      this.zone = {
        id: this.zone
      };
    if (typeof this.product == "number")
      this.product = {
        id: this.product
      };
    if (this.admission_date) {
      this.admission_date = moment(this.admission_date).format("YYYY-MM-DDTHH:mm:ss");

    }
    if (this.transfer_date) {
      this.transfer_date = moment(this.transfer_date).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.sell_date) {
      this.sell_date = moment(this.sell_date).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return this;
  },
  beforeCreate: function (valuesToSet, proceed) {
    //Valido que el epc sea valido (lo busco por el epc y que el estado sea 0 -sin usar)

    try {
      Epcs.find({
        id: valuesToSet.epc,
        state: 0
      }).then(function (epc) {
        if (epc && epc.length > 0) {
          return proceed();
        } else {
          let err = new Error('error_EPC01');
          err.bd = true;
          err.propio = true;
          err.number = 'error_EPC01';
          return proceed(err);
        }
      }).catch(function (err) {
        err.bd = true;
        err.propio = false;
        return proceed(err)
      });
    } catch (err) {
      err.bd = false;
      err.propio = false;
      return proceed(err)
    }

  },
  beforeUpdate: async function (valuesToSet, proceed) {
    //region Sells validation
    //If the sell is going to be updated, the product could not have been sold
    if(valuesToSet.sell>1){
      try {
        let product = await ProductsHasZones.findOne({
          id: valuesToSet.id
        });
        if (product && product.sell > 1) {
          let err = new Error('error_SELL01');
          err.bd = true;
          err.propio = true;
          err.number = 'error_SELL01';
          return proceed(err);
        }
      } catch (e) {
        let err = new Error('error_SELL02');
        err.bd = true;
        err.propio = true;
        err.number = 'error_SELL02';
        return proceed(err);
      }
    }

    //endregion
    //region Devolution validation
    //If the product is going to be returned, it shuould has been sold before and not returned
    if(valuesToSet.devolution>1){
      try {
        let product = await ProductsHasZones.findOne({
          id: valuesToSet.id
        });
        if (product && product.sell <= 1) {
          let err = new Error('error_DEV01');
          err.bd = true;
          err.propio = true;
          err.number = 'error_DEV01';
          return proceed(err);
        }
        if (product && product.devolution >1){
          let err = new Error('error_DEV02');
          err.bd = true;
          err.propio = true;
          err.number = 'error_DEV02';
          return proceed(err);
        }
      } catch (e) {
        sails.log.error(e);
        let err = new Error('error_DEV03');
        err.bd = true;
        err.propio = true;
        err.number = 'error_DEV03';
        return proceed(err);
      }
    }

    //endregion

    return proceed();

  },
  tableName: 'products_has_zones'
};
