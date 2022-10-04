//MONGO CONFIGS
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getTemplate = async (req, res) => {
    const project = req.params.project;
};

const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("Manette");

    try {
        //Connect to mongo
        await client.connect();

        //Find the user based on username
        const lookup = await db.collection("users").find({}).project({username:1, role:1, firstName:1, lastName:1, _id:0}).toArray();
        if (!lookup) {
            res
                .status(400)
                .json({ status: 400, message: "Projects not found" });
            return;
        }

        res.status(200).json({ status: 200, success: true, data:lookup });



    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    } finally {
        client.close();
        return;
    }
};

module.exports = { getTemplate, getUsers };