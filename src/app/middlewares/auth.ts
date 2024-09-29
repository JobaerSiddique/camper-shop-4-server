import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../modules/Error/AppError";
import httpStatus from "http-status";
;



const auth =()=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.headers.authorization
        
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED,"Token not Found")
        }

        let decoded;
        try {
            decoded = jwt.verify(token,config.ACCESS_TOKEN_SECRET as string) as JwtPayload
            
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED,"Not Valid Token")
        }

        req.user= decoded;
    
        next()
        
      
    })
}


export default auth;