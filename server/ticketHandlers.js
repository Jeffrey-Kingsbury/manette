const fs = require('fs');
// MONGO CONFIGS
const { MongoClient } = require('mongodb');

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const postNewActivity = async (ticketId) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db('Manette');

  try {
    // Connect to mongo
    await client.connect();

    const lookup = await db.collection('tickets').findOne({ _id: ticketId });
    const lookupUsername = await db.collection('users').findOne({
      username: { $regex: new RegExp(lookup.reporter), $options: 'i' },
    });

    const notificationBody = {
      time: new Date().getTime(),
      ticketId: lookup.ticketId,
      updateUser: lookup.reporter,
      type: 'NEWBUG',
      submittedDate: lookup.submittedDate,
      updateUserProfile: {
        role: lookupUsername.role,
        firstName: lookupUsername.firstName,
        lastName: lookupUsername.lastName,
        avatarSrc: lookupUsername.avatarSrc,
      },
    };

    await db.collection('activity_feed').insertOne(notificationBody);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db('Manette');

  try {
    // Connect to mongo
    await client.connect();

    // Find the user based on username
    const lookup = await db
      .collection('users')
      .find({})
      .project({ username: 1, role: 1, firstName: 1, lastName: 1, _id: 0 })
      .toArray();
    if (!lookup) {
      res.status(400).json({ status: 400, message: 'Projects not found' });
      return;
    }

    res.status(200).json({ status: 200, success: true, data: lookup });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const postNew = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db('Manette');
  const newBug = req.body;

  try {
    // Connect to mongo
    await client.connect();

    const lookupPrevious = await db
      .collection('tickets')
      .find({})
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    newBug.ticketId =
      lookupPrevious.length > 0
        ? parseInt(lookupPrevious[0].ticketId, 10) + 1
        : 1000;
    newBug.submittedDate = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;

    const insertTicket = await db.collection('tickets').insertOne(newBug);
    const lookup = await db
      .collection('tickets')
      .findOne(insertTicket.insertedId);
    res.status(200).json({ status: 200, success: true, data: lookup });
    postNewActivity(insertTicket.insertedId);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const getAllTickets = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db('Manette');

  try {
    // Connect to mongo
    await client.connect();

    const lookupPrevious = await db
      .collection('tickets')
      .find({})
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ status: 200, success: true, data: lookupPrevious });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const getSpecificTicket = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db('Manette');
  const { ticketId } = req.params;

  try {
    // Connect to mongo
    await client.connect();

    const lookupPrevious = await db
      .collection('tickets')
      .findOne({ ticketId: parseInt(ticketId, 10) });
    fs.readdir(`public/uploads/${lookupPrevious.uid}/`, (err, files) => {
      if (err) {
        res.status(200).json({
          status: 200,
          success: true,
          data: lookupPrevious,
          attachments: [],
        });
        return;
      }
      res.status(200).json({
        status: 200,
        success: true,
        data: lookupPrevious,
        attachments: files,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const updateTicket = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db('Manette');
  const ticket = req.body;

  try {
    // Connect to mongo
    await client.connect();
    const updated = await db.collection('tickets').findOneAndUpdate(
      { uid: ticket.uid },
      {
        $set: {
          status: ticket.status,
          project: ticket.project,
          department: ticket.department,
          assignee: ticket.assignee,
          platform: ticket.platform,
          severity: ticket.severity,
          component: ticket.component,
          str: ticket.str,
          details: ticket.details,
          notes: ticket.notes,
        },
      }
    );
    console.log(updated);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  postNew,
  getUsers,
  getAllTickets,
  getSpecificTicket,
  updateTicket,
};
