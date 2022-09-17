const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8000;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require("jsonwebtoken");
const { sendMail, handleLogin, handleSignup } = require("./handlers");
const { verification } = require("./verification");

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/login", handleLogin);
app.post("/signup", handleSignup);
app.post("/sendmail", verification, sendMail);


app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});