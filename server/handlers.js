require('dotenv').config()
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
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


const sendMail = async (req, res) => {
    if (req.body.to === undefined
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
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("Manette");

    //If the info is missing (Which shouldn't be possible but just in case)
    if (!user || !pass || !email || !firstName || !lastName) {
        res.status(400).json({ status: 400, message: "Missing info" });
        return
    }

    const ranAuth = Math.floor(Math.random() * (10000 - 1000) + 1000);
    const profile = {
        auth: ranAuth,
        isAuth: false
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
                subject: "Manette - Authenticate your email!",
                text: "Use this code to authenticate your email: " + ranAuth,
                html: `<b>Use this code to authenticate your email: ${ranAuth}</b>`,
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
    const user = req.body.username;
    const pass = req.body.password;
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("Manette");

    //If the info is missing (Which shouldn't be possible but just in case)
    if (!user || !pass) {
        res.status(400).json({ status: 400, message: "User not found" });
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
                .json({ status: 400, message: "User not found" });
            return;
        }

        //Compare the plaintext with the hash
        await bcrypt.compare(pass, lookup.password).then(function (result) {
            if (!result) {
                res.status(403).json({ status: 403, message: "Incorrect username or password." });
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

module.exports = { sendMail, handleLogin, handleSignup };