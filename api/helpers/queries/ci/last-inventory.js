module.exports = {


  friendlyName: 'Get last consolidate inventory by employee',


  description: '',


  inputs: {
    employeeId: {
      type: 'number',
      required: true
    }
  },


  exits: {
  },


  fn: async function ({employeeId}) {

    let SQL_DEALER= `
      SELECT id,
             DATE_FORMAT(createdAt, ${sails.config.custom.dateFormat}) AS 'createdAt',
             DATE_FORMAT(updatedAt, ${sails.config.custom.dateFormat}) AS 'updatedAt',
             name,
             total_products,
             employee_id as 'employee.id'
      FROM
           consolidated_inventories
      WHERE
            employee_id = $1
      order by
            createdAt desc
        limit 1
     `;

    let ci = await sails.sendNativeQuery(SQL_DEALER, [employeeId]);
    if(ci && ci.rows && ci.rows[0]) {
      ci = ci.rows[0];
      return sails.helpers.util.nested(ci);
    } else {
      return null;
    }

  }


};

