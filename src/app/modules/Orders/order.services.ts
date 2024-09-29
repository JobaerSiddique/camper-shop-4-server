import httpStatus from "http-status";
import AppError from "../Error/AppError";
import { Order } from "./order.model";
import { Cart } from "../Carts/cart.model";
import { Product } from "../products/product.model";
; // Assuming you have a Product model

const createOrderDB = async (cartItemIds: string[], totalPrice: number, user: any) => {
   
    const existOrder = await Order.findOne({ cartItemIds });
    if (existOrder) {
        throw new AppError(httpStatus.CONFLICT, "Order already created.");
    }

   
    const cartItems = await Cart.find({ _id: { $in: cartItemIds } }).populate('product');
    
   
    if (!cartItems || cartItems.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "Cart items not found.");
    }

    
  

    
    const session = await Cart.startSession();
    session.startTransaction();

    try {
        
        for (const cartItem of cartItems) {
            
            const product = await Product.findById(cartItem.product);
            if (product) {
               
                if (product.stock < cartItem.quantity) {
                    throw new AppError(httpStatus.BAD_REQUEST, "Not enough stock for product: " + product.name);
                }
                product.stock -= cartItem.quantity; 
                await product.save({ session }); 
            }

            
            cartItem.paid = "paid"; 
            await cartItem.save({ session }); 
        }

       
        const newOrder = await Order.create([{ cartItemIds, totalPrice, user }], { session });

        
        await session.commitTransaction();
        return newOrder;

    } catch (error) {
       
        await session.abortTransaction();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create order: " + error.message);
    } finally {
       
        session.endSession();
    }
};

export const OrderService = {
    createOrderDB,
};
