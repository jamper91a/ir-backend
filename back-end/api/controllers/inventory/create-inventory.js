module.exports = {


  friendlyName: 'Create an inventory. It is used in the app by warehouse',


  description: 'Create inventory.',


  inputs: {
    inventory: {
      type: 'json',
      required: true
    },
    products: {
      type: 'ref',
      required: true
    }
  },


  exits: {
    inventoryNotCreated: {
      description: 'Inventory could not be create',
      responseType: 'serverError'
    },
    employeeNoAssociated: {
      description: 'Employee could not be associated with the inventory',
      responseType: 'serverError'
    },
    productsNoAssociated: {
      description: 'Products could not be associated with the inventory',
      responseType: 'serverError'
    },
  },


  fn: async function ({inventory, products}) {


    return await sails.getDatastore()
      .transaction(async (db)=> {

        //Primero creo el inventario
        let newInventory,employeesInventory,inventoriesProducts;
        try {
          newInventory = await Inventories.create(inventory).usingConnection(db).fetch();
        } catch (e) {
          await sails.helpers.printError({title: 'inventoryNotCreated', message: e.message}, this.req, inventory);
          throw 'inventoryNotCreated';
        }
        //Una vez creado el inventario, le asocio el usuario
        try {
          employeesInventory = await EmployeesInventories.create({inventory:newInventory.id,employee:this.req.employee.id}).usingConnection(db).fetch();
        } catch (e) {
          await sails.helpers.printError({title: 'employeeNoAssociated', message: e.message}, this.req, this.req.employee);
          throw 'employeeNoAssociated';
        }
        try {
          products.forEach(product => product.inventory = newInventory.id);
          inventoriesProducts = await InventoriesHasProducts.createEach(products).usingConnection(db).fetch();
          return {
            data: {
              inventory:newInventory,
              employeesInventory:employeesInventory,
              products: inventoriesProducts
            }
          };
        } catch (e) {
          await sails.helpers.printError({title: 'productsNoAssociated', message: e.message}, this.req, this.req.employee);
          throw 'productsNoAssociated';
        }
      });

  }


};
