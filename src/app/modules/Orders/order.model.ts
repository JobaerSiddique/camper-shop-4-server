const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/ 
    },
    phone: {
        type: String,
        required: true,
        match: /^(?:\+88|01)?\d{9}$/ 
    },
    address: {
        type: String,
        required: true
    }
});


const orderSchema = new mongoose.Schema({
    cartItemIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cart', 
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    user: {
        type: userSchema, 
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'canceled'],
        default: 'pending'
    }
});


export const Order = mongoose.model('Order', orderSchema);


