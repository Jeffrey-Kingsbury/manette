//IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { sendMail, handleLogin, handleSignup, forgotPassword, resetPassword, validateResetPassword } = require("./handlers");
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
app.get("/resetPassword/:token", validateResetPassword);

app.get("/verifyToken", verification, (req, res) => {
    res.json({ token: true });
})
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send();
})

//POST REQUESTS
app.post("/login", handleLogin);
app.post("/signup", handleSignup);
app.post("/sendmail", verification, sendMail);
app.post("/forgotPassword", forgotPassword);
app.post("/resetPassword/:token", resetPassword);

//PATCH REQUESTS

//DELETE REQUESTS



app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});