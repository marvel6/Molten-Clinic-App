const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'please input valid details'],
        maxlength:50,
        minlength:3
    },
    password:{
        type:String,
        required:[true,'please input valid details'],
        minlength:3
    },
    email:{
        type:String,
        validate:{
            validator:validator.isEmail,
            message:"Value must be an Email"
        }
       
    },
    role:{
        type:String,
        enum:["admin","user"]
    }


});


userSchema.pre('save', async function(){   //mongoose middleware
    const salt = 10
    this.password = await bcrypt.hash(this.password,salt);
})


userSchema.methods.compares = async function(isPassword){
  const compared = await bcrypt.compare(isPassword,this.password)
  return compared;
}


module.exports = mongoose.model('userRegistration',userSchema)