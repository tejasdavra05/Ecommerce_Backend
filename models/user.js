const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')
const crypto = require('crypto')
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default: "user"
    },
    isBlocked:{
        type: Boolean,
        default: false
    },
    cart:{
        type: Array,
        default: [],
    },
    address: {
        type: String,
    },
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    refreshToken: {
        type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},{
    timestamps: true
});
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSaltSync(10)
    this.password =  await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.isPasswordMatched =  async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // Set passwordResetExpires directly on 'this'
    return resettoken;
}


//Export the model
module.exports = mongoose.model('User', userSchema);