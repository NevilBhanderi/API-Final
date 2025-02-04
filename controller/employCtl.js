const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailer = require("../middleware/mailer")
const employ = require("../model/employeeSchema")


module.exports.EmployLogin=async(req,res)=>{
    let user = await employ.findOne({email:req.body.email})
    if (user) {
       if (await bcrypt.compare(req.body.password,user.password)) {
        let token = jwt.sign({userdata:user},"nevil",{expiresIn:"5h"});
        token && res.status(200).json({msg:"Login Sucsessful",token:token})
       }else{
        res.status(400).json({msg:"password is wrong"})
       }
    }else{
        res.status(400).json({msg:"Employ not found"})
    }
}

module.exports.ViewEmploy=async(req,res)=>{
    await employ.find({}).then((data)=>{
        res.status(200).json({Data:data})
    })
}
module.exports.ChangeEmployPass=async(req,res)=>{
    if (await bcrypt.compare(req.body.oldPassword,req.user.password)) {
        if (req.body.newPassword == req.body.confirmPassword) {
            let newPass = await bcrypt.hash(req.body.newPassword, 10)
             await employ.findByIdAndUpdate(req.user._id, { password: newPass })
            res.status(200).json({ msg: "Password Change Success" })
        }else{
            res.status(400).json({ msg: "New password and confirm password must be same" })
        }
    }else{
        res.status(400).json({ msg: "Password is wrong" })
    }
}

module.exports.forgetEmployPassword = async (req, res) => {
    let data = await employ.findOne({ email: req.body.email })
    if (!data) {
        res.status(400).json({ msg: "email is wrong" })
    }
    let otp = Math.floor(Math.random() * 1000 + 9000);
    mailer.sendOtp(req.body.email, otp);
    res.cookie("otp", otp);
    res.status(200).json({ msg: "OTP sent successfully" });
}