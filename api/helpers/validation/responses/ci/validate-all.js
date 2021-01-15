
module.exports = {


  friendlyName: 'Validate all consolidate inventory',


  description: '',


  inputs: {
      body: {
        type: 'ref',
        required: true
      }
  },


  exits: {

    success: {
      description: 'All done.',
    },
    allInventoryFormatNoValid: {
      description: 'Format no valid',
    },

  },


  fn: async function ({body}) {
    const dateFormatToValid = "YYYY-MM-DDTHH:mm:ss";
    const inventories = body.data;
    if(_.isArray(inventories))
    {
      const allInventories = _.every(inventories, function (inventory) {
        const employee = inventory.employee;

        const employeeValid =  _.isObject(employee) &&
          _.isNumber(employee.id) && employee.id>0;

        const inventoryValid = _.isObject(inventory) &&
          _.isNumber(inventory.id) && inventory.id > 0 &&
          _.isString(inventory.name) &&
          _.isNumber(inventory.total_products) &&
          sails.helpers.util.validateDate(inventory.createdAt, dateFormatToValid) &&
          sails.helpers.util.validateDate(inventory.updatedAt, dateFormatToValid);



        if(!inventoryValid){
          console.log('VLI: inventoryValid no valid');
          console.log(inventory);
          return false
        }
        if(!employeeValid){
          console.log('VLI: employeeValid no valid');
          console.log(employee);
          return false;
        }

        return true;
      });
      if(!allInventories)
        throw 'allInventoryFormatNoValid';

      return true;

    } else{
      throw 'lastInventoryFormatNoValid'
    }

  }


};

