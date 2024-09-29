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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const getAllProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const { search, category, minPrice, maxPrice, sort } = payload;
    let filters = {};
    if (search) {
        filters.$or = [
            { name: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
        ];
    }
    if (category) {
        filters.category = category;
    }
    if (minPrice) {
        filters.price = Object.assign(Object.assign({}, filters.price), { $gte: Number(minPrice) });
    }
    if (maxPrice) {
        filters.price = Object.assign(Object.assign({}, filters.price), { $lte: Number(maxPrice) });
    }
    let sortOrder = {};
    if (sort === 'asc') {
        sortOrder.price = 1;
    }
    else if (sort === 'desc') {
        sortOrder.price = -1;
    }
    const result = yield product_model_1.Product.find(filters).sort(sortOrder);
    return result;
});
const getSingleProductDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProductDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = yield product_model_1.Product.findById(id);
    if (!productId) {
        throw new Error("Product Not Found");
    }
    if (productId.isDeleted) {
        throw new Error("Product already Deleted");
    }
    const updateProduct = yield product_model_1.Product.findByIdAndUpdate(id, payload, { new: true });
    return updateProduct;
});
const deleteProductDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.Product.findByIdAndUpdate(id, {
        isDeleted: true
    });
    return deleteProductDB;
});
exports.productService = {
    createProductIntoDB,
    getAllProduct,
    getSingleProductDB,
    updateProductDB,
    deleteProductDB
};
