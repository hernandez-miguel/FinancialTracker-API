const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const config = require('../config/index');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = config.accessTokenSecret;
const REFRESH_TOKEN_SECRET = config.refreshTokenSecret;

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if(!email || !password) {
      res.status(400);
      throw new Error('Email and password are required.')
    }
    
    const foundUser = await User.findOne({'email': email}).exec();

    if (!foundUser) {
      res.status(401);
      throw new Error('Email does not exist');
    } 

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const accessToken = jwt.sign(
        { 'email': foundUser.email },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
      );

      const refreshToken = jwt.sign(
        { 'email': foundUser.email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();

      res.cookie(
        'jwt',
        refreshToken,
        {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000 
        }
      );

      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error('Password does not match');
    }

  } catch(err) {
    next(err, req, res);
  }
}

module.exports = handleLogin;