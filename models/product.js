const mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type:String,
        required: true,
        //mongoose.Schema.Types.ObjectId,
        // ref:"Category",
    },
    brand:{
        type: String,
        required: true,
        //enum: ["Apple","Samsung","Lenovo"],
    },
    quantity: {
        type: Number,
        required: true,
    },
    sold:{
        type: Number,
        default: 0,
        select: false,   
    },
    images: {
        type: Array,
    },
    color:[],
    tags:[],
    ratings: [{
        star: Number,
        comment: String,
        postedby: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    },],
    totalrating: {
        type: String,
        default: 0
    }
},{timestamps: true});

//Export the model
module.exports = mongoose.model('Product', productSchema);