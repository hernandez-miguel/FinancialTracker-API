const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if(!email || !password) {
      res.status(400);
      throw new Error('Email and password are required.')
    }
    
    const foundUser = await User.findOne({'email': email});

    if (!foundUser) {
      res.status(401);
      throw new Error('Email does not exist');
    } 

    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      res.status(200).json({'sucess': `Welcome back ${foundUser.firstName}!`});
    } else {
      res.status(401);
      throw new Error('Password does not match');
    }

  } catch(err) {
    next(err, req, res);
  }
}

module.exports = handleLogin;