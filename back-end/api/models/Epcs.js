/**
	Generated by sails-inverse-model
	Date:Sun Oct 07 2018 11:23:29 GMT+1300 (NZDT)
*/

module.exports = {
    attributes: {
        state: {
            type: "number",
        },
        companias_id: {
          model: 'companias',
          required: true
        },
        epc: {
            type: "string",
            unique: true
        }
    },
  customToJSON: function() {
    //Si no se obtiene algun producto asociado, se retorna un objecto
    if(typeof this.companias_id =="number")
      this.companias_id = {
        id: this.companias_id
      };
    return this;
  }
};
