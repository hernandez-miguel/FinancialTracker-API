const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const config = require('../config/index');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = config.accessTokenSecret;
const REFRESH_TOKEN_SECRET = config.refreshTokenSecret;

const handleNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { firstName, lastName } = req.body;
    
    if(!email || !password) {
      res.status(400);
      throw new Error('Email and password are required.');
    }
    
    const duplicate = await User.exists({email: email});
    
    if (duplicate) {
      res.status(409);
      throw new Error('Email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const data = await User.create({
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': hashedPassword
    });

    // trying to create a token when registering
    const foundUser = await User.findOne({'email': email}).exec();

    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      { 
        'UserInfo': {
          'email': foundUser.email,
          'roles': roles,
        }
      },
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
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 
      }
    );

    res.status(200).json({ accessToken });
  } catch(err) {
    next(err, req, res);
  }
}

module.exports = handleNewUser;