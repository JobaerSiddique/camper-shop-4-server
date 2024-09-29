"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidations = void 0;
const zod_1 = require("zod");
const createProductVaildation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        price: zod_1.z.number().min(1, { message: "price must be greater than 0" }),
        stock: zod_1.z.number().min(1, { message: "stock must be greater than 0" }),
        description: zod_1.z.string(),
        category: zod_1.z.string(),
        ratings: zod_1.z.number().min(0).max(5).optional(),
        image: zod_1.z.array(zod_1.z.string().url()).optional()
    })
});
const updateProductVaildation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: "ProductName must be Required" }).optional(),
        price: zod_1.z.number({ message: "Price must be required" }).min(1, { message: "price must be greater than 0" }).optional(),
        stock: zod_1.z.number({ message: "Stock must be required" }).min(1, { message: "stock must be greater than 0" }).optional(),
        description: zod_1.z.string({ message: "Product Description must be required" }).optional(),
        category: zod_1.z.string({ message: "Category must be required" }).optional(),
        ratings: zod_1.z.number().min(0).max(5).optional(),
        image: zod_1.z.array(zod_1.z.string().url()).optional()
    })
});
exports.productValidations = {
    createProductVaildation,
    updateProductVaildation
};
// name:string,
// price:number,
// stock:number,
// description:string,
// category:string,
// ratings:number,
// images:string[]
