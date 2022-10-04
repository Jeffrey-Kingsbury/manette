//MONGO CONFIGS
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};




const newActivity = async (req, res) => {
    //Possible notifs

    // NEWBUG - X entered a new bug: bugNum
    // UPDATEBUG - X (closed / reopened / updated) bugNum
    // ADDCOMMENT - X added a comment to your bug: bugNum
    // ADDATTACHMENT - X added attachments to your bug: bugNum
    // SHOUT - X SHOUTED: message (Admins and managers only)

    /*
    Request shape:

    notif:{
        notifType: new,
        currentUser: x,
        updateUser: x,
        bugNum: x,
        shout: shoutMessage || null

    }

    */

   const client = new MongoClient(MONGO_URI, options);
   const db = client.db("Manette");
    try {
        const notifType = req.body.notif.notifType || null;
        const bugNum = req.body.notif.bugNum || null;
        const updateUser = req.body.notif.updateUser || null;

        
        //Connect to mongo
        await client.connect();

        const lookupUsername = await db.collection("users").findOne({ username: { $regex: new RegExp(updateUser), $options: "i" } });
        const notificationBody = {
            time: new Date().getTime(),
            bugNum: bugNum,
            updateUser: updateUser,
            type:notifType,
            updateUserProfile: {
                role: lookupUsername.role,
                firstName: lookupUsername.firstName,
                lastName: lookupUsername.lastName,
                avatarSrc: lookupUsername.avatarSrc
            }
        }

        const addNotif = await db.collection("activity_feed").insertOne(notificationBody);
        if (!addNotif) {
            res.status(400).json({ status: 400, message: "An error occurred, please try again." });
            return;
        }

        res.status(200).json({ status: 200, success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
        client.close();
        return;
    }
};


const getActivityFeed = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("Manette");
    try {

        
        //Connect to mongo
        await client.connect();
        const lookup = await db.collection("activity_feed").find().limit(15).toArray();

        res.status(200).json({ status: 200, success: true, activityFeed: lookup });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
        client.close();
        return;
    }};

module.exports = { newActivity, getActivityFeed }