import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartServices } from "./cart.services";



const addToCart = catchAsync(async(req,res)=>{
    const addItem = req.body;
    const userId = req.user.userId
    
    console.log(addItem);
    const result = await (await CartServices.addToCartInDb(userId,addItem))
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Cart Added Successfully",
        data:result
    })
})

const getSingleUserCart = catchAsync(async(req,res)=>{
    const userId = req.user.userId;
    const findCart = await CartServices.getUserCartDB(userId)
   
    
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Cart fetched Successfully",
        data: findCart  
    })
})

const updateCartStock = catchAsync(async(req,res)=>{
    const {cartId,quantity} = req.body;
    const result = await CartServices.updateCartStockDB(cartId,quantity)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Cart stock updated successfully",
        data: result
    })
})


const deleteCart = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await CartServices.deleteCartDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "Cart deleted successfully",
        data: null  
    })
})

const totalPrice = catchAsync(async (req, res) => {
    const userId = req.user.userId
    console.log(userId);
  
    // Call the service to calculate the total price
    const result = await CartServices.totalPriceDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Total price calculated successfully',
        data: result // Return the total price and cart details
    });
});

export const CartController = {
    addToCart,
    getSingleUserCart,
    updateCartStock,
    deleteCart,
    totalPrice
}