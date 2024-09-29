import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { OrderService } from "./order.services";


const createOrder= catchAsync(async(req,res)=>{
    const { cartItemIds, totalPrice, user } = req.body;
   
    const result = await OrderService.createOrderDB(cartItemIds, totalPrice, user)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Order Created Successfully",
        data:result  
    })
})





export const OrderController ={
    createOrder
}