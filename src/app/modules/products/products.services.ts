import  {Product} from "./product.model"





const createProductIntoDB = async(payload:string)=>{
    const result = await Product.create(payload)
    return result
}


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
    throw new Error("Product Not Found")
  }

  if(productId.isDeleted){
    throw new Error("Product already Deleted")
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