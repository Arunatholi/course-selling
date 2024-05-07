const bcrypt = require('bcrypt');
const generalToken = require("../utils/generateToken.js")
const User = require('../models/userModel.js')

const signup = async(req,res)=>{
    // console.log("hitted");
    try {
        // console.log(req.body);
        const{ firstName,lastName, password, email} =req.body;
        console.log(email);
    const userExist = await User.findOne({email})

    console.log(userExist);

    if(!userExist){
        return res.send("user already exists")
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User
    ({
        firstName,
        lastName,
        email,
        hashPassword

    });

    const newUserCreated = await newUser.save();

    console.log(newUserCreated);

    if(!newUserCreated){
        return res.send('user not created')
    }

    const token = generalToken(email)
    res.cookie("token",token)
    res.send("signed succssfully")
    } catch (error) {
        console.log(error,"something wrong");
        res.status(500).send("internel server error")
    }

}

const signin = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        console.log(user);

        if(!user){
            return res.send("not valid")
        }

        const matchPassword = await bcrypt.compare(password, user.hashPassword)

        if(!matchPassword){
            return res.send("Password mismatch")
        }

        const token = generalToken(email)
        res.send(token)
    } catch (error) {
        console.log(error,"error conform");
    }


}

module.exports ={
    signin,signup
}