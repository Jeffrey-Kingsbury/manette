const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 8000;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require("jsonwebtoken");
const { sendMail } = require("./handlers");

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.post("/sendmail", sendMail);


app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});