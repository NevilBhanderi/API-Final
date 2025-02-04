const express = require("express");
const router = express.Router();
const ctl = require("../controller/adminCtl");
const auth = require("../middleware/auth");

router.post("/register" , ctl.adminRegister);
router.post("/adminLogin" , ctl.adminLogin);


router.get("/adminView", auth, ctl.view);
router.delete("/adminDelete",ctl.Delete)
router.put("/adminEdit",ctl.Edit);

router.post("/adminChangePass" ,auth, ctl.adminChangePass); 
router.post("/adminForgotPass" , ctl.adminForgotPass); 

router.post("/registerManager",ctl.managerRegister)
router.get("/viewManagerData",auth,ctl.viewManagerData);
router.delete("/deleteManager",ctl.deleteManager);

router.get("/viewEmploy",auth,ctl.viewEmploy);
router.delete("/deleteEmploy",ctl.deleteEmploy);

module.exports = router;
