import { model, Schema } from "mongoose";


const ProductSchema = new Schema({
    name:{
        type:String,
        required:[true,{message:"Product  Name must be required"}]
    },
    price:{
        type:Number,
        required:[true,{message:"Price must be required"}],
        
    },
    stock:{
        type:Number,
        required:[true,{message:"Stock must be required"}]
    },
    description:{
        type:String,
        required:[true,{message:"Product Description must be required"}]
    },
    category:{
        type:String,
        required:true
    },
    ratings:{
        type:Number
    },
    images:[String],
    isDeleted:{
        type:Boolean,
        default:false
    }

    
})


export const Product = model('product',ProductSchema) 