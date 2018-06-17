const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require("lodash");

const Schema = mongoose.Schema;

//User schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: (value)=>{
            return validator.isEmail;
        },
        message: '{value} is not a valid email'
    },
    password: {
        type: String,
        minlength: 6,
    },
    tokens:[{
        access:{
            type: String,
            require: true
        },
        token:{
            type: String,
            require: true
        }
    }]
});

//methods
//return only the the id and email
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function(){
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id:user._id.toHexString(), access},'this is the secret').toString();

    user.tokens.push({
        access,
        token
    });

    //user.tokens = user.tokens.concat([{access,token}]);

    return user.save().then(()=>{
        return token
    });
}

// User model
let User = mongoose.model('User', UserSchema);

module.exports = {User}

