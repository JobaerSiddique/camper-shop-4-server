import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import config from "../../config";



const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,{message:"User Name must be required"}]
    },
    email:{
        type:String,
        
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

UserSchema.pre('save',async function(next){
    if (!this.isModified('password')) return next();
    const user = this;
    
    user.password = await bcrypt.hash(user.password,Number(config.SALT ))
    next()
})

UserSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };


export const User= model('user',UserSchema)