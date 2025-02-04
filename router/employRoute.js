const express = require("express")
const rout = express.Router()
const ctl = require("../controller/employCtl")
const auth = require("../middleware/emplyeeAuth")
// const EmployAuth = require("../middlewear/EmployAuth")

rout.post("/employLogin",ctl.EmployLogin)
rout.get("/viewEmploy",auth,ctl.ViewEmploy)
rout.put("/changeEmployPass",auth,ctl.ChangeEmployPass)
rout.post("/forgetEmployPass",ctl.forgetEmployPassword)


module.exports = rout