const express=require('express');
const router=express.Router();
const {createUser,UserSignIn}=require("../controllers/userController")




router.post("/signUp",createUser);
router.post("/signIn",UserSignIn);





module.exports=router
