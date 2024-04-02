const mongoose = require('mongoose'); 
var prodcategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
},{timestamps: true});

//Export the model
module.exports = mongoose.model('PCategory', prodcategorySchema);