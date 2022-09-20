const jwt = require('jsonwebtoken');

function verification(req, res, next) {
    const token = req.headers['token']

    if (!token) return res.status(401).json({ status: 401, error: "Auth token missing." });

    try {
        jwt.verify(token, process.env.JWTPRIVATE, () => {
            console.log('confirmed')
        });

        next();


    } catch (err) {
        console.log(err)
        res.status(401).json({ status: 401, error: "Auth token invalid." })
    }

};

module.exports = { verification };