// IMPORTS
const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8000;
const multer = require('multer');
const morgan = require('morgan');
const fs = require('fs');
const {
  sendMail,
  handleLogin,
  handleSignup,
  forgotPassword,
  resetPassword,
  validateResetPassword,
  updateUserData,
  validateSignupToken,
  sendInvite,
} = require('./loginHandlers');
const {
  newActivity,
  getActivityFeed,
  shout,
} = require('./notificationHandlers');
const { verification } = require('./verification');
const {
  postNew,
  getUsers,
  getAllTickets,
  getSpecificTicket,
  updateTicket,
  getTicketsByUser,
} = require('./ticketHandlers');
const { getProjectData } = require('./dashboardHandlers');

// CONFIGS
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // IF THE PATH DOES NOT EXIST, CREATE THE FOLDER
    if (!fs.existsSync(`public/uploads/${req.params.ticketId}/`)) {
      fs.mkdirSync(`public/uploads/${req.params.ticketId}/`, {
        recursive: true,
      });
    }
    // UPLOAD THE IMAGES TO THIS FOLDER
    cb(null, `public/uploads/${req.params.ticketId}/`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
require('dotenv').config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('public'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

/// ////////////////
// GET REQUESTS //
/// //////////////
// Reset the password with the token retrieved from the forgot password email (Expires in 1 hour after signing)
app.get('/resetPassword/:token', validateResetPassword);
// Easier call for the frontend to check the token and retrieve the associated currentUserData.
app.get('/verifyToken', verification, (req, res) => {
  res.json({ token: true, currentUserData: res.locals.currentUserData });
});
// Verify the email and role from the admins signup invite.
app.get('/verifysignup/:token', validateSignupToken);
// Logout function. Removes the token from the FE. On re-render the user will be forced back to the login screen.
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.send();
});
// This will force the currentUserData on the frontend to be updated by issuing a new token (Ex. the user changes their avatar, call this and re-render the page)
app.get('/updateUserData', verification, updateUserData);
// Get the activity feed
app.get('/activityFeed', verification, getActivityFeed);
// Get all the projects and their templates
app.get('/projectData', verification, getProjectData);
// Get a list of usernames and roles
app.get('/getUsers', verification, getUsers);
// Get a list of all tickets
app.get('/getalltickets', verification, getAllTickets);
// Get specific ticket data
app.get('/ticket/:ticketId', verification, getSpecificTicket);
// Get all tickets by user
app.get('/getalltickets/user/:username', verification, getTicketsByUser);

/// /////////////////
// POST REQUESTS //
/// ///////////////
app.post('/login', handleLogin);
app.post('/signup', handleSignup);
app.post('/forgotPassword', forgotPassword);
app.post('/resetPassword/:token', resetPassword);
app.post('/sendmail', verification, sendMail);
app.post('/notifications', verification, newActivity);
app.post('/newbug/:ticketId', verification, upload.any(), postNew);
app.post('/updateticket/:ticketId', verification, upload.any(), updateTicket);
app.post('/shout', verification, shout);
// Invite users to create an account.
app.post('/sendinvite', verification, sendInvite);

// PATCH REQUESTS

// DELETE REQUESTS

// Delete image attachments
app.delete('/deleteAttachment/:uid/:attachmentId', verification, (req, res) => {
  // Remove the specific file.
  fs.unlink(
    `public/uploads/${req.params.uid}/${req.params.attachmentId}`,
    (err) => {
      if (err) {
        res.status(500).json({ status: 500, error: err });
      } else {
        res.status(200).json({ status: 200, message: 'success' });
        // Cleanup. If the folder is empty, delete the folder.
        fs.readdir(`public/uploads/${req.params.uid}`, (error, files) => {
          if (error) {
            console.log(error);
          } else if (!files.length) {
            fs.rmdir(`public/uploads/${req.params.uid}`, (error2) => {
              if (error2) console.log(error2);
            });
          }
        });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
