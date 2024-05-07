const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type : String,
            required: true,

            
            
        },
        lastName:{
            type : String,
            required: true,
            
        },
        email:{
            type : String,
            required: true,
            unique: true,
            minLength:3,
            
        },
        hashPassword:{
            type : String,
            required: true,
            minLength:3,
            
        },
        // courses:[{ type:mongoose.Types.ObjectId, ref:"course"}]
    },
    {timestamps:true}
  );

  const User = mongoose.model('User', userSchema);

  module.exports = User;