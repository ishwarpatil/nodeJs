var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email:{
        type : String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password:{
        type: String,
        //required:true,
    },
    tokens:{
        access:{
            type : String,
        },
        token:{
            type : String,
        }
    }
});

    //generate token and password
  UserSchema.pre('save',function(next){
      if(this.isModified('password')){
          bcrypt.genSalt(10,(err,salt) => {
              bcrypt.hash(this.password,salt,(err,hash) => {
                  this.password = hash; // bcrypt.compare(this.password,hash,(err,result)=>{ console.log(result)})

                  // token generate
                  var access = 'auth';
                  var token = jwt.sign({_id: this._id.toHexString(),access},'My Secret').toString();
                  this.tokens.access="auth";
                  this.tokens.token=token;

                  next();
              });
          });
      }
      else{
          next();
      }
  });

    //delete token
    UserSchema.methods.removeToken = function(token) {
        var user = this;
        return user.update({
            $pull:{
                tokens:{token}
            }
        });
    };

    //verify token
    UserSchema.statics.findByToken = function(token) {
        var user = this; //entire model is binded with .this
        var decoded;

        try{
            decoded = jwt.verify(token,'My Secret');
        } catch(e) {
            return Promise.reject('rejected...');
        }

        return user.findOne({
            _id: decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });
    };

    //login user
    UserSchema.statics.findByCredentials = function(email,password) {
        var user = this;
        return user.findOne({email}).then((user) => {
           if(!user){
               return Promise.reject();
           }
           return new Promise((resolve,reject) => {
               bcrypt.compare(password,user.password,(err,result) => {
                  if(result){
                      resolve(user);
                  }else{
                      reject();
                  }
               });
           });
        });
    };

var user = mongoose.model('user',UserSchema);

module.exports = {user};