const mongoose = require("mongoose");
const validator = require('validator')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cryptography = require('../middleware/cryptography')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true,
    trim: true,
    validate(value){
       
        if(!validator.isEmail(value)){
            throw new Error('email is invalid!')
        }
    }
  },
  password: {
    type: String,
    required:true,
    trim:true,
    minlength: 8,
    validate(value){
       
        if(validator.isEmpty(value)){
          throw new Error('please enter your password!')
        } else if (!validator.matches(value, /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)){
          throw new Error('password should be minimum eight characters and at least one letter, one number and one special character!')
        }
    }
 
  },
  tokens:[{
      token:{
          type:String,
          required: true
      }
  }],
  createdAt:{
      type: Date,
      default: Date.now
  }
});

UserSchema.pre('save', async function(next){
  const user = this

  if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()

})

UserSchema.methods.newAuthToken = async function(){

  const user  = this

  // To create an encrypted user Id
  const Encrypted = cryptography.encrypt('mySecretSalt')
  const EncryptedUserId = Encrypted(user.id.toString())

  const token =  jwt.sign({ _id: EncryptedUserId },'secret', {expiresIn: "3 days"})

  user.tokens = user.tokens.concat({ token })


  await user.save()
  return token
}



// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
