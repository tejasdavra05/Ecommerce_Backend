const mongoose = require("mongoose")

const connectDB = (uri) =>{
    try {
        mongoose.connect(uri)
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error in connection",error);
    }
}

module.exports = connectDB;