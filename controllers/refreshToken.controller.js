const User = require('../models/user.model');
const config = require('../config/index');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = config.accessTokenSecret;
const REFRESH_TOKEN_SECRET = config.refreshTokenSecret;

const handleRefreshToken = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    
    if(!cookies?.jwt) {
      res.status(401);
      throw new Error('Unauthorized', cookies);
    }
    
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ 'refreshToken': refreshToken }).exec();

    if (!foundUser) {
      res.status(403);
      throw new Error('Forbidden');
    } 

    jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.email !== decoded.email) {
          res.status(403);
          throw new Error('Forbidden');
        }
        
        const roles = Object.values(foundUser.roles);

        const accessToken = jwt.sign(
          {
            'UserInfo': {
              'email': decoded.email,
              'roles': roles,
            }
          },
          ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        )

        res.json({ accessToken });
      }
    );

  } catch(err) {
    next(err, req, res);
  }
}

module.exports = { handleRefreshToken };