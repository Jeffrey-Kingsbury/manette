//IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { sendMail, handleLogin, handleSignup, forgotPassword, resetPassword } = require("./handlers");
const { verification } = require("./verification");
const morgan = require("morgan");

//CONFIGS
require('dotenv').config()
const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


// GET REQUESTS
app.get("/resetPassword/:token", resetPassword);
app.get("/verifyToken", verification, (req, res) => {
    res.json({ token: true });
})
//POST REQUESTS
app.post("/login", handleLogin);
app.post("/signup", handleSignup);
app.post("/sendmail", verification, sendMail);
app.post("/forgotPassword", forgotPassword);

//PATCH REQUESTS

//DELETE REQUESTS



app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});