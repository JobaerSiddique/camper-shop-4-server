import mongoose, { model, Schema } from "mongoose";


  
  const cartSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'product', 
        required: true 
    },
    quantity: {
         type: Number, 
         required: true, 
         min: 1 
        },
    isDeleted:{
      type: Boolean,
      default: false
    },
    paid:{
      type:String,
      enum:['paid','cancel','pending'],
      default:'pending'
    }
  });


  export const Cart = model('Cart',cartSchema)