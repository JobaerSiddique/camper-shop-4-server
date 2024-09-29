import catchAsync from "../../utils/catchAsync"


const createOrder= catchAsync(async(req,res)=>{
    const { cartItemIds, totalPrice, user } = req.body;
    console.log(cartItemIds, totalPrice, user);
})





export const OrderController ={
    createOrder
}