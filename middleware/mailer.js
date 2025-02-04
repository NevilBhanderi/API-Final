const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport ({
    service: "gmail" , 
    auth:{
        user:"nevilbhanderi09@gmail.com" ,
        pass: "bgslbworpggjbmwh"
    },
});

module.exports.sendOtp = (to,otp) => {
    let mailOption ={
        from: "nevilbhanderi09@gmail.com",
        to:to,
        subject: "Your OTP is Here",
        text: `Your OTP is ${otp}`,
    };

    transport.sendMail(mailOption,(err)=>{
        err && console.log(err ? err : "OTP sent successful");
        
    });
};

module.exports.managerPass = (to, email, pass) => {
    let mailOption = {
        to: to,
        from: "",
        subject: "your password and email",
        text: `your email is ${email} and your password for this is ${pass}`
    }
};