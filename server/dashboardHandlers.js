// MONGO CONFIGS
const { MongoClient } = require('mongodb');

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getProjectData = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db('Manette');

  try {
    // Connect to mongo
    await client.connect();

    // Find the user based on username
    const lookup = await db.collection('ticket_data').find().toArray();
    if (!lookup) {
      res.status(400).json({ status: 400, message: 'Projects not found' });
      return;
    }

    res.status(200).json({ status: 200, success: true, data: lookup });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getProjectData };
