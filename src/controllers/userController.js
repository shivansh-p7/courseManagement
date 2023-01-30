const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const { isValidName, isValidEmail, isValidPassword } = require("../validators/validate")
const validator=require("validator")
const jwt=require("jsonwebtoken")

const createUser = async (req, res) => {

    try {
        let userData = req.body;
        if (Object.keys(userData).length == 0) return res.status(400).send({ status: false, message: "please provide details about you" })
        let { name, email, password, role } = userData

        if (name != undefined && typeof (name) != "string") return res.status(400).send({ status: false, message: "invalid name" });
        if (!name || name.trim() == "") return res.status(400).send({ status: false, message: "name is required" });
        if (!isValidName(name.trim())) return res.status(400).send({ status: false, message: "name can only contain letters" });
        userData.name = userData.name.trim()


        if (email != undefined && typeof (email) != "string") return res.status(400).send({ status: false, message: "invalid email" });
        if (!email || email.trim() == "") return res.status(400).send({ status: false, message: "email is required" });
        console.log(isValidEmail(email))
        if(isValidEmail(email) || !validator.isEmail(email))  return res.status(400).send({status:false,message:"invalid email"});
        userData.email = userData.email.trim()

        let isEmailExist = await UserModel.findOne({ email: email, isDeleted: false });
        if (isEmailExist) return res.status(400).send({ status: false, message: "email already exist" })


        if (password != undefined && typeof (password) != "string") return res.status(400).send({ status: false, message: "invalid password" });
        if (!password || password.trim() == "") return res.status(400).send({ status: false, message: "password is required" });
        if(!isValidPassword(password.trim()))  return res.status(400).send({status:false,message:"password should contain atleast a lowerCase, a upperCase, a number and a special character"});
        userData.password = userData.password.trim()

        const validRoles = ["Employee", "Admin", "Super Admin"]
        if (role && !validRoles.includes(role)) return res.status(400).send({ status: false, message: `user can have only ${validRoles} roles` });




        let userDetails = await UserModel.create(userData);
        return res.status(201).send({ status: true, data: userDetails })

    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message });

    }
};



const UserSignIn=async(req,res)=>{
    try{
    const userData=req.body;
    const {email,password}=userData;

    if (email != undefined && typeof (email) != "string") return res.status(400).send({ status: false, message: "invalid email" });
    if (!email || email.trim() == "") return res.status(400).send({ status: false, message: "email is required" });
    console.log(isValidEmail(email))
    if(isValidEmail(email) || !validator.isEmail(email))  return res.status(400).send({status:false,message:"invalid email"});
    userData.email = userData.email.trim()
    
    if (password != undefined && typeof (password) != "string") return res.status(400).send({ status: false, message: "invalid password" });
        if (!password || password.trim() == "") return res.status(400).send({ status: false, message: "password is required" });
        if(!isValidPassword(password.trim()))  return res.status(400).send({status:false,message:"password should contain atleast a lowerCase, a upperCase, a number and a special character"});
        userData.password = userData.password.trim()

        let isUserExist = await UserModel.findOne({ email: email,password:password, isDeleted: false });
        if (isUserExist) return res.status(404).send({ status: false, message: "User does not exist" });

        const token= jwt.sign({
            role:isUserExist.role,
            userId:isUserExist._id,
            exp:(Math.floor(Date.now()/1000)+84600)
        },"shivansh143-key");

        res.setHeader("jwt-token",token);
        return res.status(200).send({status:true,message:"signed In Successfully",jwtToken:token})
    }
        catch (error) {
            return res.status(500).send({ status: false, error: error.message });
    
        }
}

module.exports = { createUser ,UserSignIn}

