const jwt = require('jsonwebtoken');
const config = require('../config/index');

ACCESS_TOKEN_SECRET = config.accessTokenSecret;

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
      token,
      ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          res.status(403);
          throw new Error('Invalid Token')
        }
        req.email = decoded.email;
        next();
      }
    );
  } catch (err) {
    next(err, req, res);
  }
}


module.exports = verifyJWT;  