/**
 Generated by sails-inverse-model
 Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
 */

const bcrypt = require('bcrypt-nodejs');
var moment = require('moment');

module.exports = {
  attributes: {

    name: {
      type: "string",
      unique: true
    },
    username: {
      type: "string",
      unique: true
    },
    password: {
      type: "string",
    },
    username_rfdi: {
      type: "string",
      allowNull: true
    },
    password_rfdi: {
      type: "string",
      allowNull: true
    },
    active: {
      type: "boolean"
    },
    group: {
      model: "groups",
      columnName: "group_id",
      required: true
    },

    //Relaciones

    //El empleado asociado a este usuario
    employee: {
      collection: 'employees',
      via: 'user'
    },

    //El empleado asociado a este usuario
    dealer: {
      collection: 'dealers',
      via: 'user'
    }
  },
  customToJSON: function () {
    if (typeof this.group == "number")
      this.group = {
        id: this.group
      };
    if (this.createdAt) {
      this.createdAt = moment(this.createdAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (this.updatedAt) {
      this.updatedAt = moment(this.updatedAt).format("YYYY-MM-DDTHH:mm:ss");
    }
    return _.omit(this, ['password'])
  },
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  },
  beforeUpdate: function (user, cb) {
    if(user.password){
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, null, function (err, hash) {
          if (err) return cb(err);
          user.password = hash;

        });
      });
    }
    return cb();

  }
};