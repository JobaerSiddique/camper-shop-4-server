import catchAsync from "../../utils/catchAsync"
import { OrderService } from "./order.services";


const createOrder= catchAsync(async(req,res)=>{
    const { cartItemIds, totalPrice, user } = req.body;
   
    const result = await OrderService.createOrderDB(cartItemIds, totalPrice, user)
})





export const OrderController ={
    createOrder
}