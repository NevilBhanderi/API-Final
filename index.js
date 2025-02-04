const express = require("express");
const port = 3211;
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const cookie = require("cookie-parser")

app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use("/" , require("./router/admin"));
app.use("/manager" , require("./router/managerRoute."));
app.use("/employee" , require("./router/employRoute"));
// app.use("/product" , require("./routes/productRoute"));
app.listen(port , (err)=>{
    err ? console.log(err) : console.log("server strted on port " + port);
})


