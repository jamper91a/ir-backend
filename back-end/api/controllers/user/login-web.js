const passport = require('passport');
const jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Login web',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const self = this;
    passport.authenticate('local', async function (err, employee, user, info) {
      if (err) {
        await sails.helpers.printError({title: 'loginWeb', message: err}, self.req, err);
        return self.res.serverError();
      }
      if(user === null && employee !== null){
        user = employee.user;
      }

      if(!user){
        return self.res.forbidden();
      }
      self.req.login(user, {session: false}, async (err) => {
        if (err) {
          return self.res.badRequest(err);
        }
        if (user) {
          /**
           * Populate info depending of the group
           * Just groups 1, 2 and 5 are allow (sAdmin, admin and dealer)
           */
          if(user.group === 1 || user.group === 2 || user.group === 5){
            const dealer = await Dealers.findOne({user: user.id});
              const token = jwt.sign(
                {
                  user_id: user.id
                },
                'k{B^um3fzwP-68cN');
              let data={
                user: user,
                dealer: dealer,
                employee: employee,
                token: token
              };
              return exits.success({data})
          } else {
            return self.res.forbidden();
          }
        }else{
          return self.res.forbidden();
        }
      });



    })(self.req, self.res);

  }


};
