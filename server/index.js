//IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { sendMail, handleLogin, handleSignup, forgotPassword, resetPassword, validateResetPassword, updateUserData } = require("./loginHandlers");
const { newActivity, getActivityFeed } = require("./notificationHandlers");
const { verification } = require("./verification");
const { getTemplate, getUsers } = require("./ticketHandlers");
const morgan = require("morgan");
const { getProjectData } = require("./dashboardHandlers");

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
app.post("/sendmail", verification, sendMail);
app.post("/forgotPassword", forgotPassword);
app.post("/resetPassword/:token", resetPassword);
app.post("/notifications", newActivity);

//PATCH REQUESTS

//DELETE REQUESTS

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});



/*
HOW PROJECT TICKET DATA DEFAULTS ARE STORED:

{"_id":{"$oid":"633c4a6b3833185552ec99f8"},
"projects":{
    "Demo - Game":{
        "components":["UI/UX", "Art", "Audio/SFX", "Audio/Music", "Text", "Programming", "Crash", "General", "Translation"],
        "severities":["Crash", "Major", "Minor", "Trivial", "Feedback"],
        "Departments":["FQA", "CQA", "Dev", "Certification", "Localization"]
    },
    "Demo - Website":{
        "components":["UI/UX", "Accesibility", "Art", "Text", "Programming", "Crash", "Backend", "Frontend", "SEO"],
        "severities":["Crash", "Major", "Minor", "Trivial", "Feedback"],
        "Departments":["FQA", "Dev", "Marketing", "Localization"]
    }
}
}
*/