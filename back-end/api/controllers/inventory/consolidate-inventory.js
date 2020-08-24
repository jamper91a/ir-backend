module.exports = {


  friendlyName: 'Consolidate',


  description: `
  Este servicio web se encargara de consolidar dos inventories parciales, deben ser fechas diferentes pero la misma zona
  1-> Se crea un nuevo inventario consolidado.
  2-> Se asocian los inventories parciales al inventario consolidado
  `,


  inputs: {
    inventories:{
      type: 'json',
      required: true,
      description: 'Id de los inventories a consolidar',
      custom: function (inventories){
        console.log()
        const isArray = _.isArray(inventories)
        const length = inventories.length>1;

        if(!isArray) {
          sails.helpers.printError({title: 'consolidateInventory', message: 'Inventories is not an array'}, 'consolidateInventory', inventories);
        }
        if(!length) {
          sails.helpers.printError({title: 'consolidateInventort', message: 'Inventories must be at least 2'}, 'consolidateInventory', inventories);
        }

        console.log(isArray && length);

        return isArray && length;
      }
    },
    name: {
      type: 'string',
      required: true,
      description: 'Name of the new consolidate inventory'
    }
  },


  exits: {
    sameZone: {
      description: 'Inventory are from the same zone',
      responseType: 'badRequest'
    },
    alreadyConsolidated: {
      description: 'One of the inventories has been already consolidated',
      responseType: 'badRequest'
    },
    inventoriesNotValid: {
      description: 'The inventories are not valid',
      responseType: 'badRequest'
    },
    inventoriesNoFound: {
      description: 'The inventories were not found',
      responseType: 'badRequest'
    },

    inventoryConsolidatedNoCreated: {
      description: 'Inventory Consolidated could not be created',
      responseType: 'serverError'
    },
    inventoriesNoAssociated: {
      description: 'Inventories could not be associated with the new consolidated inventory',
      responseType: 'serverError'
    }
  },


  fn: async function ({inventories, name}) {

    let inventoryConsolidated,things,inventory,auxInventories;


    return await sails.getDatastore()
      .transaction(async (db)=> {
        var totalProducts=0;
        //Se valida que la zona de los inventories sean diferentes
          auxInventories = await Inventories.find(
            {
              where: {id: inventories},
              select: ['zone', 'consolidatedInventory']
            }).populate("products").usingConnection(db);
          // console.log('auxInventories', auxInventories);
          // console.log('inventories', inventories);
          if(auxInventories && auxInventories.length>1) {
            let zones = auxInventories.map(a => a.zone);
            auxInventories = auxInventories.every(function (inventory, index) {
              totalProducts+=inventory.products.length;
              //Valido que los inventories sean de zonas diferentes
              if(zones.includes(inventory.zone,index+1)){
                //sails.helpers.printError({title: 'sameZone', message: ''}, this.req, inventory);
                throw 'sameZone';
                //Valido que los inventories no se hayan consolidado antes
              }else if (inventory.consolidatedInventory && inventory.consolidatedInventory>1){
                //sails.helpers.printError({title: 'alreadyConsolidated', message: ''}, this.req, inventory);
                throw 'alreadyConsolidated';
              }
              else{
                return true;
              }

            });
            // console.log('auxInventories', auxInventories);
            if(!auxInventories) {
              throw 'inventoriesNotValid';
            }
          } else {
            throw 'inventoriesNoFound';
          }


        //1 -> Se crea un nuevo inventario consolidado.

        try {
          inventoryConsolidated = await ConsolidatedInventories.create(
            {
              employee: this.req.employee.id,
              name: name,
              total_products:totalProducts
            }).usingConnection(db).fetch();
        } catch (e) {
          sails.helpers.printError({title: 'inventoryConsolidatedNoCreated', message: e.message}, this.req, e);
          throw 'inventoryConsolidatedNoCreated';
        }


        //2 -> Se asocian los inventories parciales al inventario consolidado
        try {
          inventory = await Inventories.update(
            {
              id: inventories
            })
            .set(
              {
                consolidatedInventory: inventoryConsolidated.id
              })
            .usingConnection(db).fetch();

          return {
            data: {
              inventories:inventory,
              consolidatedIventory: inventoryConsolidated
            }}
        } catch (e) {
          sails.helpers.printError({title: 'inventoriesNoAssociated', message: e.message}, this.req, e);
          throw 'inventoriesNoAssociated';
        }

      });

  }


};
