const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const jwt_secret = process.env.JWTSECRET

const generateToken = (id) =>{
    return jwt.sign({id},jwt_secret,{expiresIn: "1d"})
}

module.exports = {generateToken}