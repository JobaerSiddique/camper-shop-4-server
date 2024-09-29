"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartServices = void 0;
const auth_model_1 = require("../auth/auth.model");
const product_model_1 = require("../products/product.model");
const cart_model_1 = require("./cart.model");
const AppError_1 = __importDefault(require("../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const addToCartInDb = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity } = payload;
    console.log(quantity);
    try {
        // Find the user
        const userFind = yield auth_model_1.User.findById(userId);
        if (!userFind) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
        }
        // Find the product
        const findProduct = yield product_model_1.Product.findById(product);
        if (!findProduct) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
        }
        // Check if the product is deleted
        if (findProduct.isDeleted) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product has been deleted");
        }
        // Check if the product is in stock
        if (findProduct.stock === 0) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product is out of stock");
        }
        // Check if requested stock exceeds available stock
        if (findProduct.stock < quantity) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Insufficient stock available");
        }
        // Check if the product already exists in the cart
        let cartItem = yield cart_model_1.Cart.findOne({ product: product, user: userId });
        if (cartItem) {
            // If the product is already in the cart, calculate new stock
            const newStock = cartItem.quantity + 1;
            // Ensure the new stock doesn't exceed available stock
            if (newStock > findProduct.stock) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cannot add more than available stock");
            }
            // Update cart item stock
            cartItem.quantity = newStock;
            yield cartItem.save();
        }
        else {
            // If product is not in the cart, create a new cart item
            cartItem = new cart_model_1.Cart({
                user: userId,
                product: product,
                quantity: quantity,
            });
            yield cartItem.save();
        }
        return cartItem; // Return the updated or created cart item
    }
    catch (error) {
        console.error(error);
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const getUserCartDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({ user: id })
        .populate('user')
        .populate('product');
    return result;
});
const updateCartStockDB = (cartId, stock) => __awaiter(void 0, void 0, void 0, function* () {
    const findCart = yield cart_model_1.Cart.findById(cartId).populate('product user');
    if (findCart.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cart has been deleted");
    }
    const availableStock = findCart.product.stock;
    // Validate the quantity
    if (stock < 1 || stock > availableStock) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Quantity must be between 1 and ${availableStock}`);
    }
    findCart.quantity = stock;
    yield findCart.save();
    return findCart;
});
const totalPriceDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.find({ user: userId })
        .populate('user')
        .populate('product');
    console.log(result);
    const totalPrice = result.reduce((total, item) => {
        // Check if the product and quantity exist before calculating the price
        if (!item.isDeleted && item.product && item.quantity) {
            return total + item.product.price * item.quantity;
        }
        return total;
    }, 0);
    console.log(totalPrice);
    return totalPrice;
});
const deleteCartDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findCart = yield cart_model_1.Cart.findById(id);
    console.log({ findCart });
    if (!findCart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart not found");
    }
    if (findCart.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cart has been deleted");
    }
    const deleteCart = yield cart_model_1.Cart.findByIdAndUpdate(id, {
        isDeleted: true
    });
    return deleteCart;
});
exports.CartServices = {
    addToCartInDb,
    getUserCartDB,
    updateCartStockDB,
    deleteCartDB,
    totalPriceDB
};
