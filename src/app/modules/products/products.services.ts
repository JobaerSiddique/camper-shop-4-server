import httpStatus from "http-status"
import AppError from "../Error/AppError"
import  {Product} from "./product.model"





const createProductIntoDB = async (payload: any) => {
  const { name, category } = payload;

  
  const existingProduct = await Product.findOne({ name, category });

  if (existingProduct) {
   
    throw new AppError(httpStatus.BAD_REQUEST,`Product with the name "${name}" in the "${category}" category already exists.`);
  }

  
  const result = await Product.create(payload);
  return result;
};


const getAllProduct = async(payload: any)=>{
  console.log(payload)
    const {search,category,minPrice,maxPrice,sort} = payload
    let filters ={}
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
        filters.price = { ...filters.price, $gte: Number(minPrice) };
      }
      if (maxPrice) {
        filters.price = { ...filters.price, $lte: Number(maxPrice) };
      }
      let sortOrder = {};
      if (sort === 'asc') {
        sortOrder.price = 1;
      } else if (sort === 'desc') {
        sortOrder.price = -1;
      }
    const result = await Product.find(filters).sort(sortOrder)
    return result
}


const getSingleProductDB = async(id:string)=>{
  const result = await Product.findById(id)
  return result
}


const updateProductDB = async (id:string,payload:any)=>{
  const productId = await Product.findById(id)
  if(!productId){
    throw new AppError(httpStatus.NOT_FOUND,"Product Not Found")
  }

  if(productId.isDeleted){
    throw new AppError(httpStatus.BAD_REQUEST,"Product already Deleted")
  }

  const updateProduct = await Product.findByIdAndUpdate(id,payload,{new:true})

  return updateProduct
}


const deleteProductDB = async(id:string)=>{
  const deletedProduct = await Product.findByIdAndUpdate(id,{
   isDeleted:true
  })
  return deleteProductDB

}


export const productService = {
    createProductIntoDB,
    getAllProduct,
    getSingleProductDB,
    updateProductDB,
    deleteProductDB
}