const jsonwebToken = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.SE;

const generalToken =(email)=>{
    return jsonwebToken.sign({data:email}, secretKey,{expiresIn:"1d"});
};

module.exports = generalToken;