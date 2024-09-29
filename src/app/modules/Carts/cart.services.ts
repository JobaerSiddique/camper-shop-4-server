import mongoose from "mongoose"
import { User } from "../auth/auth.model"
import { Product } from "../products/product.model"
import { Cart } from "./cart.model"
import AppError from "../Error/AppError";
import httpStatus from "http-status";



const addToCartInDb = async (userId, payload) => {
    const { product, quantity} = payload;
console.log(quantity);
    try {
        // Find the user
        const userFind = await User.findById(userId);
        if (!userFind) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found");
        }

        // Find the product
        const findProduct = await Product.findById(product);
        if (!findProduct) {
            throw new AppError(httpStatus.NOT_FOUND, "Product not found");
        }

        // Check if the product is deleted
        if (findProduct.isDeleted) {
            throw new AppError(httpStatus.BAD_REQUEST, "Product has been deleted");
        }

        // Check if the product is in stock
        if (findProduct.stock === 0) {
            throw new AppError(httpStatus.BAD_REQUEST, "Product is out of stock");
        }

        // Check if requested stock exceeds available stock
        if (findProduct.stock < quantity) {
            throw new AppError(httpStatus.BAD_REQUEST, "Insufficient stock available");
        }

        // Check if the product already exists in the cart
        let cartItem = await Cart.findOne({ product: product, user: userId });

        if (cartItem) {
            // If the product is already in the cart, calculate new stock
            const newStock = cartItem.quantity + 1;

            // Ensure the new stock doesn't exceed available stock
            if (newStock > findProduct.stock) {
                throw new AppError(httpStatus.BAD_REQUEST, "Cannot add more than available stock");
            }

            // Update cart item stock
            cartItem.quantity = newStock;
            await cartItem.save();
        } else {
            // If product is not in the cart, create a new cart item
            cartItem = new Cart({
                user: userId,
                product: product,
                quantity : quantity,
            });
            await cartItem.save();
        }

        return cartItem; // Return the updated or created cart item
    } catch (error) {
        console.error(error);
        throw new AppError(httpStatus.BAD_REQUEST, error.message);
    }
};



const getUserCartDB = async(id:string)=>{
    const result = await Cart.find({user:id})
    .populate('user')
    .populate('product')
    
  return result;
   
 

 
}

const updateCartStockDB = async (cartId:string, stock:number) => {
    const findCart = await Cart.findById(cartId).populate('product user');
  

    
    if (findCart.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "Cart has been deleted");
    }

  
   

  
    const availableStock = findCart.product.stock;

    // Validate the quantity
    if (stock < 1 || stock > availableStock) {
        throw new AppError(httpStatus.BAD_REQUEST, `Quantity must be between 1 and ${availableStock}`);
    }

    
    findCart.quantity =  stock; 
    await findCart.save(); 

   
    
    return findCart; 
};


const totalPriceDB = async (userId:string) => {
    

    const result = await Cart.find({user:userId})
    .populate('user')
    .populate('product')
    console.log(result);
    
    const totalPrice =  result.reduce((total, item) => {
        // Check if the product and quantity exist before calculating the price
        if (!item.isDeleted && item.product && item.quantity) {
          return total + item.product.price * item.quantity;
        }
        return total;
      }, 0);
      console.log(totalPrice);
    return totalPrice
   
};





const deleteCartDB = async(id:string)=>{
    const findCart = await Cart.findById(id)
    console.log({findCart});
    if(!findCart) {
        throw new AppError(httpStatus.NOT_FOUND,"Cart not found")
    }
    if(findCart.isDeleted){
        throw new AppError(httpStatus.BAD_REQUEST,"Cart has been deleted")
    }

    const deleteCart = await Cart.findByIdAndUpdate(id,{
        isDeleted:true
    })
    return deleteCart;
}
export const CartServices = {
    addToCartInDb,
    getUserCartDB,
    updateCartStockDB,
    deleteCartDB,
    totalPriceDB
}