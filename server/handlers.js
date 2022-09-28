//DOTENV CONFIG
require('dotenv').config()

//JWT
const jwt = require("jsonwebtoken");

//BCRYPT CONFIGS
const bcrypt = require('bcrypt');
const saltRounds = 10;

//MONGO CONFIGS
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const db = client.db("Manette");

//NODEMAILER CONFIGS
const nodemailer = require("nodemailer");
const NODEMAILERU = process.env.NODEMAILERU
const NODEMAILERP = process.env.NODEMAILERP
const NODEMAILERHOST = process.env.NODEMAILERHOST;
const NODEMAILERPORT = process.env.NODEMAILERPORT;
let transporter = nodemailer.createTransport({
    host: NODEMAILERHOST,
    port: NODEMAILERPORT,
    secure: true,
    auth: {
        user: NODEMAILERU,
        pass: NODEMAILERP,
    },
});


//Send emails via nodemailer.
//REQUIRED DATA: To, Subject, Text, HTML.
//OPTIONAL DATA: CC, BCC
const sendMail = async (req, res) => {
    if (
        req.body.to === undefined
        || req.body.subject === undefined
        || req.body.text === undefined
        || req.body.html === undefined) {

        res.status(400).json({ message: "Missing information (Either the recipient, the subject, the text, or the html", data: req.body })
        return;
    }

    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: NODEMAILERU,
            to: req.body.to,
            cc: req.body.cc,
            bcc: req.body.bcc,
            subject: req.body.subject,
            text: req.body.text,
            html: req.body.html,
        });

        res.status(200).json({ status: 200, message: "Sent!", data: info });

    } catch (err) {

        res.status(500).json({ status: 500, message: "An error occurred", data: err });

    } finally {
        return;
    }

};

const handleSignup = async (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    //If the info is missing (Which shouldn't be possible but just in case)
    if (!user || !pass || !email || !firstName || !lastName) {
        res.status(400).json({ status: 400, message: "Missing info" });
        return;
    }

    const profile = {
        verifiedEmail: false
    };


    try {
        //Connect to mongo
        await client.connect();
        console.log("connected!");

        //Find the user based on username
        const lookup = await db.collection("users").findOne({ $or: [{ username: user }, { email: email }] });
        if (lookup) {
            res
                .status(400)
                .json({ status: 400, message: "That username or email already exists." });
            return;
        }

        await bcrypt.hash(pass, saltRounds).then(function (hash) {
            profile.username = user;
            profile.email = email;
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.password = hash;
        });

        const addUser = await db.collection("users").insertOne(profile);
        if (!addUser) {
            res.status(400).json({ status: 400, message: "An error occurred, please try again." });
            return;
        }

        try {
            // send auth code.
            await transporter.sendMail({
                from: NODEMAILERU,
                to: email,
                subject: "Manette - email verification",
                text: "You have been invited to demo.manette.ca. Sign in to complete your profile!" ,
                html: `You have been invited to <a href="demo.manette.ca" target="_blank">demo.manette.ca</a>. Sign in to complete your profile!`,
            });


        } catch (err) {
            console.log(err)
        }

        res.status(200).json({ status: 200, success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
        client.close();
        console.log("disconnected!");
        return;
    }

};


const handleLogin = async (req, res) => {
    console.log(req.body)
    const user = req.body.username;
    const pass = req.body.password;

    //If the info is missing (Which shouldn't be possible but just in case)
    if (!user || !pass) {
        res.status(400).json({ status: 400, message: "Invalid username or password" });
        return
    }

    try {
        //Connect to mongo
        await client.connect();
        console.log("connected!");

        //Find the user based on username
        const lookup = await db.collection("users").findOne({ username: user });
        if (!lookup) {
            res
                .status(400)
                .json({ status: 400, message: "Invalid username or password" });
            return;
        }

        //Compare the plaintext with the hash
        await bcrypt.compare(pass, lookup.password).then(function (result) {
            if (!result) {
                res.status(403).json({ status: 403, message: "Invalid username or password" });
                return
            }

            const token = jwt.sign({ username: lookup.username }, process.env.JWTPRIVATE);
            res.cookie("token", token);
            res.status(200).json({ status: 200, success: true });
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
        client.close();
        console.log("disconnected!");
        return;
    }

};


const forgotPassword = async (req, res) => {
    const email = req.body.email;

    if (!email) {
        res.status(400).json({ status: 400, message: "No username provided." });
        return
    }

    try {
        //Connect to mongo
        await client.connect();
        console.log("connected!");

        //Find the user based on email
        const lookup = await db.collection("users").findOne({ email: email });
        if (!lookup) {
            res
                .status(200)
                .json({ status: 200, message: "If the email exists in our database, an email will be sent with a link to reset the password." });
            return;
        }

        const resetToken = jwt.sign({ username: lookup.username, email: lookup.email, reset: true }, process.env.JWTPRIVATE, { expiresIn: "1h" });
        await transporter.sendMail({
            from: NODEMAILERU,
            to: lookup.email,
            subject: "Manette - Password reset request.",
            text: "Go here to reset your Manette password! https://www.manette.ca/resetpassword/" + resetToken,
            html: ` Click here to reset your password: <a target="_blank" href="https://www.manette.ca/resetpassword/${resetToken}">RESET MY PASSWORD</a>`,
        });

        res.status(200).json({ status: 200, success: true, message:"If the email exists in our database, an email will be sent with a link to reset the password." });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
        client.close();
        console.log("disconnected!");
        return;
    }
};

const resetPassword = async (req, res) => {
    const resetToken = req.params.token;

    try {
        jwt.verify(resetToken, process.env.JWTPRIVATE, async (err, decoded) => {


            //if err -> either invalid or expired
            if (err) {
                res.status(400).json({ status: 400, data: resetToken, error: err.message });
                return;
            }

            //if decoded -> correct token, allow password reset.
            res.status(200).json({ status: 200, username: decoded.username })
        });

    } catch (err) {
        console.log(err)
        res.status(401).json({ status: 401, error: "Auth token invalid." })
    }

};

module.exports = { sendMail, handleLogin, handleSignup, forgotPassword, resetPassword };