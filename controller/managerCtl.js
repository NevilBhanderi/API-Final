const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../middleware/mailer");
const manager = require("../model/managerSchema");
const employ = require("../model/employeeSchema");

module.exports.ManagerLogin=async(req,res)=>{
    let user = await manager.findOne({email:req.body.email})
    if (user) {
       if (await bcrypt.compare(req.body.password,user.password)) {
        let token = jwt.sign({userdata:user},"nevil",{expiresIn:"5h"});
        token && res.status(200).json({msg:"Login Sucsessful",token:token})
       }else{
        res.status(400).json({msg:"password is wrong"})
       }
    }else{
        res.status(400).json({msg:"user not found"})
    }
}
 module.exports.ManagerDetail=async(req,res)=>{
     await manager.find({}).then((data)=>{
         res.status(200).json({Details:data})
     })
 }
// module.exports.ChangeManPassword=async(req,res)=>{
    
//     if (await bcrypt.compare(req.body.oldPassword,req.user.password)){
//         if (req.body.newPassword == req.body.confirmPassword) {
//             let newPass = await bcrypt.hash(req.body.newPassword, 10)
//              await manager.findByIdAndUpdate(req.user._id, { password: newPass })
//             res.status(200).json({ msg: "Password Change Succ" })
//         }else{
//             res.status(400).json({ msg: "New password and confirm password must be same" })
//         }
//     }else{
//         res.status(400).json({ msg: "Password is wrong" })
//     }
// }

module.exports.ChangeManPassword = async (req, res) => {
    console.log("Decoded User Data:", req.user); // Debugging log

    if (!req.user) {
        return res.status(400).json({ msg: "User not authenticated" });
    }

    const user = await manager.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect old password" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).json({ msg: "New password and confirm password must be the same" });
    }

    let newPass = await bcrypt.hash(req.body.newPassword, 10);
    await manager.findByIdAndUpdate(req.user._id, { password: newPass });

    res.status(200).json({ msg: "Password changed successfully" });
};


module.exports.forgetManagerPassword = async (req, res) => {
    let data = await manager.findOne({ email: req.body.email })
    if (!data) {
        res.status(400).json({ msg: "email is wrong" })
    }
    let otp = Math.floor(Math.random() * 1000 + 9000);
    mailer.sendOtp(req.body.email, otp);
    res.cookie("otp", otp);
    res.status(200).json({ msg: "OTP sent successfully !" });
}
module.exports.RegisterEmploy=async(req,res)=>{
    let user = await employ.findOne({email:req.body.email})
    if (user) {
    res.status(200).json({msg:"Employ Alredy Exist"})
    }
    req.body.password = await bcrypt.hash(req.body.password,10)
    await employ.create(req.body).then((data)=>{
        res.status(200).json({msg:"Employe Added"})
    })
}

module.exports.ViewEmployData=async(req,res)=>{
    await employ.find({}).then((data)=>{
        res.status(200).json({Data:data})
    })
}