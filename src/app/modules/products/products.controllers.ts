import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { productService } from "./products.services";





const createProduct = catchAsync(async (req,res)=>{
  
    const result  = await productService.createProductIntoDB(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Product created successfully",
        data:result
    })
})


const getAllProduct  = catchAsync(async(req,res)=>{
   const query = req.query

    const products = await productService.getAllProduct(query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"product is retrived",
        data:products
    })
})


const getSingleProduct = catchAsync(async(req,res)=>{
    const productId = req.params.id;
    const result = await productService.getSingleProductDB(productId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: `product fetched Successfully`,
        data:result
    })
})


const updateProduct = catchAsync(async(req,res)=>{
    const productId = req.params.id;
    const updated = req.body;
    console.log({updated});
    const result = await productService.updateProductDB(productId,updated)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Product Updated Successfully",
        data:result
    })
})


const deleteProduct = catchAsync(async(req,res)=>{
    const id = req.params.id;
    const result = await productService.deleteProductDB(id)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Product deleted Successfully",
        data:null
    })
})
export const productController = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}