const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const jwt_secret = process.env.JWTSECRET

const generateRefreshToken = (id) =>{
    return jwt.sign({id},jwt_secret,{expiresIn: "3d"})
}

module.exports = {generateRefreshToken}