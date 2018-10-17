/**
	Generated by sails-inverse-model
	Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
*/

const bcrypt = require('bcrypt-nodejs');


module.exports = {
    attributes: {

        username: {
            type: "string",
            unique:true
        },
        password: {
            type: "string",

        },
        username_rfdi: {
            type: "string",

        },
        password_rfdi: {
            type: "string",

        },
        groups_id: {
            type: "number",

            required: true
        },

        //Relaciones

        //El empleado asociado a este usuario
        empleado:{
          collection:'empleados',
          via: 'users_id'
        }
    },
  customToJSON: function() {
    return _.omit(this, ['password'])
  },
  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
};
