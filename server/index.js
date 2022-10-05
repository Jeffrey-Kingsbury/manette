//IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const multer = require('multer');
const { sendMail, handleLogin, handleSignup, forgotPassword, resetPassword, validateResetPassword, updateUserData } = require("./loginHandlers");
const { newActivity, getActivityFeed } = require("./notificationHandlers");
const { verification } = require("./verification");
const { postNew, getUsers } = require("./ticketHandlers");
const morgan = require("morgan");
const { getProjectData } = require("./dashboardHandlers");
const bodyParser = require("body-parser");
const fs = require('fs');

//CONFIGS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //IF THE PATH DOES NOT EXIST, CREATE THE FOLDER
        if (!fs.existsSync(`public/uploads/${req.params.ticketId}/`)) {
            fs.mkdirSync(`public/uploads/${req.params.ticketId}/`, { recursive: true })
        }
        //UPLOAD THE IMAGES TO THIS FOLDER
        cb(null, `public/uploads/${req.params.ticketId}/`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });
require('dotenv').config()
const app = express();
app.use(express.static('public'))
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
///////////////////
// GET REQUESTS //
/////////////////
//Reset the password with the token retrieved from the forgot password email (Expires in 1 hour after signing)
app.get("/resetPassword/:token", validateResetPassword);
//Easier call for the frontend to check the token and retrieve the associated currentUserData.
app.get("/verifyToken", verification, (req, res) => { res.json({ token: true, currentUserData: res.locals.currentUserData }); });
//Logout function. Removes the token from the FE. On re-render the user will be forced back to the login screen.
app.get("/logout", (req, res) => { res.clearCookie("token"); res.send(); });
//This will force the currentUserData on the frontend to be updated by issuing a new token (Ex. the user changes their avatar, call this and re-render the page)
app.get("/updateUserData", verification, updateUserData);
//Get the activity feed
app.get("/activityFeed", verification, getActivityFeed);
//Get all the projects and their templates
app.get("/projectData", verification, getProjectData);
//Get a list of usernames and roles
app.get("/getUsers", verification, getUsers);

////////////////////
// POST REQUESTS //
//////////////////
app.post("/login", handleLogin);
app.post("/signup", handleSignup);
app.post("/forgotPassword", forgotPassword);
app.post("/resetPassword/:token", resetPassword);
app.post("/sendmail", verification, sendMail);
app.post("/notifications", verification, newActivity);
app.post("/newbug/:ticketId", verification, upload.any(), postNew);
app.post("*", verification, (req, res) => {
    res.status(404).send()
});

//PATCH REQUESTS

//DELETE REQUESTS

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
