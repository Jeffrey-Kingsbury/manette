//IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { sendMail, handleLogin, handleSignup, forgotPassword, resetPassword, validateResetPassword, updateUserData } = require("./loginHandlers");
const { verification } = require("./verification");
const morgan = require("morgan");

//CONFIGS
require('dotenv').config()
const app = express();
app.use(express.static('public'))
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

///////////////////
// GET REQUESTS //
/////////////////
//Reset the password with the token retrieved from the forgot password email (Expires in 1 hour after signing)
app.get("/resetPassword/:token", validateResetPassword);
//Easier call for the frontend to check the token and retrieve the associated userdata.
app.get("/verifyToken", verification, (req, res) => { res.json({ token: true, userData: res.locals.userData }); });
//Logout function. Removes the token from the FE. On re-render the user will be forced back to the login screen.
app.get("/logout", (req, res) => { res.clearCookie("token"); res.send(); });
//This will force the userdata on the frontend to be updated by issuing a new token (Ex. the user changes their avatar, call this and re-render the page)
app.get("/updateUserData", verification, updateUserData);

////////////////////
// POST REQUESTS //
//////////////////
app.post("/login", handleLogin);
app.post("/signup", handleSignup);
app.post("/sendmail", verification, sendMail);
app.post("/forgotPassword", forgotPassword);
app.post("/resetPassword/:token", resetPassword);

//PATCH REQUESTS

//DELETE REQUESTS
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);
const db = client.db("Manette");

app.get('/createusers', async (req, res) => {
    try {
        //Connect to mongo
        await client.connect();
        await db.createCollection("users")
        await db.collection("users").createIndex({ username: 1 },
            { collation: { locale: 'en', strength: 2 } })
        await db.collection("users").createIndex({ email: 1 },
            { collation: { locale: 'en', strength: 2 } })
        res.status(200).json({ status: 200, success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
        client.close();
        return;
    }
})


app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});