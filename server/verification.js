const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
function verification(req, res, next) {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ status: 401, error: 'Auth token missing.' });

  try {
    jwt.verify(token, process.env.JWTPRIVATE, (err, decoded) => {
      res.locals.currentUserData = decoded;
    });

    next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(401).json({ status: 401, error: 'Auth token invalid.' });
  }
}

module.exports = { verification };
