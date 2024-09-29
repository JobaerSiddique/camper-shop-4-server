"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, { message: "Product  Name must be required" }]
    },
    price: {
        type: Number,
        required: [true, { message: "Price must be required" }],
    },
    stock: {
        type: Number,
        required: [true, { message: "Stock must be required" }]
    },
    description: {
        type: String,
        required: [true, { message: "Product Description must be required" }]
    },
    category: {
        type: String,
        required: true
    },
    ratings: {
        type: Number
    },
    images: [String],
    isDeleted: {
        type: Boolean,
        default: false
    }
});
exports.Product = (0, mongoose_1.model)('product', ProductSchema);
