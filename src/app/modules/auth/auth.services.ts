import { TLoginUser } from "./auth.interface"
import { User } from "./auth.model"
import bcrypt from 'bcrypt';
import { createToken } from "./auth.utils";
import config from "../../config";
import AppError from "../Error/AppError";
import httpStatus from "http-status";




const createUserIntoDB = async(payload:string)=>{
  const userExists = await User.findOne({email:payload.email})  
  if(userExists){
    throw new AppError(httpStatus.BAD_REQUEST,"Email already exists")
  }
  
  const user = await User.create(payload)
    return user
}

const LoginUserfromDB = async(payload:TLoginUser)=>{
   const user = await User.findOne({email:payload.email})
   console.log({user})
   if(!user ){
     throw new Error("email not Vaild")
   }

   const isPassword = await bcrypt.compare(payload?.password,user.password)
   if(!isPassword){
     throw new Error("email or password not vaild")
   }

   const accesstoken = createToken({userId:user._id.toString(),role:user.role},config.ACCESS_TOKEN_SECRET as string,"10d")
   const refreshToken = createToken({userId:user._id.toString(),role:user.role},config.REFRESH_TOKEN_SECRET as string,"365days")


   return {
    user,
    accesstoken,refreshToken
   }

}

const UserInfoDB = async(id:string)=>{
const result = await User.findById(id)
return result;
}

export const AuthServices = {
    createUserIntoDB,
    LoginUserfromDB,
    UserInfoDB
}