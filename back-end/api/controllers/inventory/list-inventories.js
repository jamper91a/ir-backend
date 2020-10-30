module.exports = {


  friendlyName: 'List inventories',


  description: `
    Esta funcion se encargara de listar los inventories creados y no consolidados, con el fin de seleccionar inventorarios
    para consolidar.
     * 1-> Busco los usuario que pertenecen a una compania
     * 2-> Busco los inventories creados por esos usuarios
  `,


  inputs: {
    type: {
      type: 'string',
      required: true,
      description: `
            Si es consolidado, busque aquellos con consolidatedInventory mayor a 1,
            Si es no_consolidado busque aquellos con consolidatedInventory igual 1
            Si es all busque todos`
    },
    collaborative: {
      type: 'boolean',
      required: true,
      description: 'Determia si se listan parciales o colaborativos'
    }
  },


  exits: {

  },


  fn: async function ({type, collaborative}) {

    let employees, inventories;
    try {
      employees = await  Employees.find({
        where:{company: this.req.employee.company.id}
      })
        .populate('inventories',{
          where:{
            consolidatedInventory:
            /** Si es consolidado, busque aquellos con consolidatedInventory mayor a 1,
             *  Si es no_consolidado busque aquellos con consolidatedInventory igual 1
             *  Si es all busque todos*/
              (type === 'consolidado' ? {'>': 1} : type === "no_consolidado" ? 1 : {'>=':1 }),
            collaborative: collaborative
          }
        })
      //Se elimina la informacion innecesaria y se muestra solo los inventories de cada empleado
      inventories = employees.map(a => a.inventories);
      var auxInv = [];
      //Variable para almacenar las zona y agregarselas a los inventarios, pues es requerido por la app
      var zonesToFind = [];
      //Unir los inventario en una var
      for(var inventory of inventories){
        for(var aux of inventory){
          auxInv.push(aux);
          zonesToFind.push(aux.zone);
        }
      }
      //Busco las zonas
      var auxZones = await Zones.find({id: zonesToFind}).populate('shop');
      for(var inventory of auxInv){
        inventory.zone = _.find(auxZones, function (zone) {
          return zone.id === inventory.zone
        });
      }
      return {data: auxInv}
    } catch (e) {
      sails.helpers.printError({title: 'listInventories', message: e.message}, this.req, e);
      throw e;
    }

  }


};
