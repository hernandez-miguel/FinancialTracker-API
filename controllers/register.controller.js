const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { firstName, lastName } = req.body;
    
    if(!email || !password) {
      res.status(400);
      throw new Error('Email and password are required.')
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

    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

module.exports = handleNewUser;