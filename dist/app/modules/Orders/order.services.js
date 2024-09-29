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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const order_model_1 = require("./order.model");
const cart_model_1 = require("../Carts/cart.model");
const product_model_1 = require("../products/product.model");
; // Assuming you have a Product model
const createOrderDB = (cartItemIds, totalPrice, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existOrder = yield order_model_1.Order.findOne({ cartItemIds });
    if (existOrder) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Order already created.");
    }
    const cartItems = yield cart_model_1.Cart.find({ _id: { $in: cartItemIds } }).populate('product');
    if (!cartItems || cartItems.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Cart items not found.");
    }
    const session = yield cart_model_1.Cart.startSession();
    session.startTransaction();
    try {
        for (const cartItem of cartItems) {
            const product = yield product_model_1.Product.findById(cartItem.product);
            if (product) {
                if (product.stock < cartItem.quantity) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Not enough stock for product: " + product.name);
                }
                product.stock -= cartItem.quantity;
                yield product.save({ session });
            }
            cartItem.paid = "paid";
            yield cartItem.save({ session });
        }
        const newOrder = yield order_model_1.Order.create([{ cartItemIds, totalPrice, user }], { session });
        yield session.commitTransaction();
        return newOrder;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Failed to create order: " + error.message);
    }
    finally {
        session.endSession();
    }
});
exports.OrderService = {
    createOrderDB,
};
