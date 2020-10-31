module.exports = {


  friendlyName: 'Attach inventory to one already created',


  description: 'Web service that helps to join to an inventory already created. This is used in the app for the employees',


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
    inventoryNotValid: {
      description: 'Inventory is not collaborative',
      responseType: 'badRequest'
    },
    employeeNoAssociated: {
      description: 'Employee could not be associated with the inventory',
      responseType: 'badRequest'
    },
    productsNoAssociated: {
      description: 'Products could not be associated with the inventory',
      responseType: 'badRequest'
    },
  },


  fn: async function ({inventory, products}) {

    let auxInventory, employessInventory,inventoriesProducts;
    auxInventory = await Inventories.findOne({id: inventory.id});
    if(auxInventory.collaborative){
      return await sails.getDatastore()
        .transaction(async (db)=> {

          //Actualizo el mensaje
          let newMessage =  auxInventory.message + "." + this.req.employee.id + ": " + inventory.message;
          await Inventories.updateOne({id: inventory.id}, {message: newMessage }).usingConnection(db);
          //Una vez creado el inventario, le asocio el usuario
          try {
            employessInventory = await EmployeesInventories.create({inventory: auxInventory.id,employee:this.req.employee.id}).usingConnection(db).fetch();
          } catch (e) {
            sails.helpers.printError({title: 'employeeNoAssociated', message: e.message}, this.req, this.req.employee);
            throw 'employeeNoAssociated';
          }
          try {
            products.forEach(ip => ip.inventory = inventory.id);
            inventoriesProducts = await InventoriesHasProducts.createEach(products).usingConnection(db).fetch();
            return {data: {
                inventory:inventory,
                employeesInventory:employessInventory,
                products: inventoriesProducts
              }};
          } catch (e) {
            sails.helpers.printError({title: 'productsNoAssociated', message: e.message}, this.req);
            throw 'productsNoAssociated';
          }
        })
    } else {
      sails.helpers.printError({title: 'inventoryNotValid', message:''}, this.req, inventory);
      throw 'inventoryNotValid';
    }

  }


};
