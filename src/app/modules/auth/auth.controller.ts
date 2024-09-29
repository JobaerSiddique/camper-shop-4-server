import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import config from "../../config";





const createUser = catchAsync(async(req,res)=>{
    console.log(req.body)
    const result = await AuthServices.createUserIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Created Successfully",
        data:result
    })
})


const LoginUser = catchAsync(async(req,res)=>{
    const users = req.body
    const result = await AuthServices.LoginUserfromDB(users)
   const {user,accesstoken ,refreshToken} = result
    res.cookie( 'refreshToken',refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Login Successfully",
        data:{
           
            accesstoken
        }
    })
})


const userInfo = catchAsync(async(req,res)=>{
    const ids = req.params.id;
    const result = await AuthServices.UserInfoDB(ids)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User info",
        data:result
    })
})

export const  AuthController = {
    createUser,
    LoginUser,
    userInfo
}