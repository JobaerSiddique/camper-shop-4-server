import { z } from "zod";

const createProductVaildation = z.object({
   body:z.object({
      name:z.string(),
      price:z.number().min(1,{message:"price must be greater than 0"}),
      stock:z.number().min(1,{message:"stock must be greater than 0"}),
      description:z.string(),
      category:z.string(),
      ratings:z.number().min(0).max(5).optional(),
      image:z.array(z.string().url()).optional()
   
   })
})
 const updateProductVaildation = z.object({
   body:z.object({
      name:z.string({message:"ProductName must be Required"}).optional(),
      price:z.number({message:"Price must be required"}).min(1,{message:"price must be greater than 0"}).optional(),
      stock:z.number({message:"Stock must be required"}).min(1,{message:"stock must be greater than 0"}).optional(),
      description:z.string({message:"Product Description must be required"}).optional(),
      category:z.string({message:"Category must be required"}).optional(),
      ratings:z.number().min(0).max(5).optional(),
      image:z.array(z.string().url()).optional()
   
   })
 })


export const productValidations = {
createProductVaildation,
updateProductVaildation
}

// name:string,
// price:number,
// stock:number,
// description:string,
// category:string,
// ratings:number,
// images:string[]