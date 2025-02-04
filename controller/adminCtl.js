const apifinal = require("../model/adminSchema");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer");
const manager = require("../model/managerSchema");
const employee = require("../model/employeeSchema");

module.exports.adminRegister = async (req, res) => {
    let user = await apifinal.findOne({email:req.body.email})
    if (user) {
        return res.status(200).json({msg:"user alredy exist"})
    }
    req.body.password = await bcrypt.hash(req.body.password,10)   // convert password in to secure form(unreadable formate) in mongoDB
    await apifinal.create(req.body).then((data)=>{
    res.status(200).json({msg:"user Added"})
    })
};

module.exports.adminLogin = async (req,res) => {
 let user = await apifinal.findOne({email: req.body.email})
 if (user) {
    if(await bcrypt.compare(req.body.password , user.password)) {
        let token = jwt.sign({userData:user}, "nevil" , {expiresIn:"5h"})
        token && res.status(200).json({msg: "user login" , token:token})
    } else {       
        res.status(400).json({msg:"passowrd wrong"})
    }
 }  else{
    return res.status(400).json({msg: "user noy found"})
 }
}


module.exports.view = async (req, res) => {
   await apifinal.find({}).then((data) => {
    res.status(200).json({ msg: "this is data", Info: data });
  });
};

module.exports.Delete=async(req,res)=>{
    await apifinal.findByIdAndDelete(req.query.id).then((data)=>{
        res.status(200).json({msg:"deleted"})
    })
};

module.exports.Edit=async(req,res)=>{
    await apifinal.findByIdAndUpdate(req.query.id,req.body).then((data)=>{
        res.status(200).json({msg:"updated"})
    })
};

module.exports.adminChangePass = async (req,res) => {
    
    if (await bcrypt.compare(req.body.oldPassword,req.user.password)){
        if (req.body.newPassword == req.body.confirmPassword) {
            let newPass = await bcrypt.hash(req.body.newPassword, 10)
             await apifinal.findByIdAndUpdate(req.user._id, { password: newPass })
            res.status(200).json({ msg: "Password Change Succ" })
        }else{
            res.status(400).json({ msg: "New password and confirm password must be same" })
        }
    }else{
        res.status(400).json({ msg: "Password is wrong" })
    }
}

module.exports.adminForgotPass = async (req,res) =>{
    let data = await apifinal.findOne({ email: req.body.email })
    if (!data) {
        res.status(400).json({ msg: "email is wrong" })
    }
    let otp = Math.floor(Math.random() * 1000 + 9000);
    mailer.sendOtp(req.body.email, otp);
    res.cookie("otp", otp);
    res.status(200).json({ msg: "OTP sent successfully !" });
};

module.exports.managerRegister=async(req,res)=>{
    let user = await manager.findOne({email:req.body.email})
    if(user){
        res.status(200).json({msg:"user alredy exist"})
    }
    req.body.password = await bcrypt.hash(req.body.password,10)
    await manager.create(req.body).then((data)=>{
        res.status(200).json({msg:"Manager Added"})
    })
}
module.exports.viewManagerData=async(req,res)=>{
   await manager.find({}).then((data)=>{
    res.status(200).json({Data:data})
   })
}

module.exports.deleteManager=async(req,res)=>{
    await manager.findByIdAndDelete(req.query.id).then((data)=>{
        res.status(200).json({msg:"Data Deleted"})
    })
}
module.exports.viewEmploy=async(req,res)=>{
    await employee.find({}).then((data)=>{
        res.status(200).json({Data:data})
    })
}

module.exports.deleteEmploy=async(req,res)=>{
    await employee.findByIdAndDelete(req.query.id).then((data)=>{
        res.status(200).json({msg:"Employe Removed"})
    })
}