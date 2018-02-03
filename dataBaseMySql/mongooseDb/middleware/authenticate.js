var {user} = require('./../models/user');

var authenticate = (req,res,next) => {
  var token =req.header('x-auth');

    user.findByToken(token).then((user) => {
    if(!user){
        return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }, (err) => {
      res.send(err);
  });
};

module.exports = {authenticate};