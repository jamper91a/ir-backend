module.exports = {


  friendlyName: 'Update supplier',


  description: 'Used by admin in the front end',


  inputs: {
    id: {
      type: 'number',
      required: true,
      custom: function (id) {
        return id>0;
      }
    },
    name: {
      type: 'string',
      required: true,

    }
  },


  exits: {
    supplierNotValid: {
      description: 'Supplier not valid to update',
      responseType: 'forbidden'
    }
  },


  fn: async function ({id, name}) {

    try {
      //Checkl if user can update this shop
      const supplier = await Suppliers.findOne(id);
      if(supplier && supplier.company === this.req.employee.company.id) {
        await Suppliers.updateOne({id}).set({name});
      } else {
        throw 'supplierNotValid'
      }

    } catch (e) {
      await sails.helpers.printError({title: 'updateSupplier', message: e.message}, this.req);
      throw e;
    }

  }


};
