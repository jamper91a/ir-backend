module.exports = {


  friendlyName: 'List inventories',


  description: `
    Esta funcion se encargara de listar los inventories creados y no consolidados, con el fin de seleccionar inventories
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
        });
      //Se elimina la informacion innecesaria y se muestra solo los inventories de cada empleado
      inventories = employees.map(a => a.inventories);
      var auxInv = [];
      //Unir los inventario en una var
      for(var inventory of inventories){
        for(var aux of inventory){
          auxInv.push(aux);
        }
      }
      return {data: auxInv}
    } catch (e) {
      await sails.helpers.printError({title: 'listInventories', message: e.message}, this.req, e);
      throw e;
    }

  }


};
