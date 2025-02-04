const express = require("express");
const rout = express.Router();
const ctl = require("../controller/managerCtl");
const ManagerAuth = require("../middleware/managerAuth");

rout.post("/managerLogin",ctl.ManagerLogin);
rout.get("/managerDetail",ManagerAuth,ctl.ManagerDetail);
rout.post("/changeManPass",ManagerAuth,ctl.ChangeManPassword);
rout.post("/forgetManagerPass",ctl.forgetManagerPassword);

rout.post("/employRegister",ManagerAuth,ctl.RegisterEmploy);
rout.get("/viewEmployData",ManagerAuth,ctl.ViewEmployData);



module.exports = rout;