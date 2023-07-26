const User = require('../models/userModel');

const getUser = async (req, res, next) => {
  try {
    let {id} = req.params;
    let data;

    if(id) {
      data = await User.findById(id);
    } else {
      data = await User.find({});
    }

    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const createUser = async (req, res, next) => {
  try {
    const data = await User.create(req.body);
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const {id} = req.params;

    if (!id) {
      throw Error('Please enter ID');
    }

    const dataToUpdate = await User.findByIdAndUpdate(id, req.body);
    const updatedData = await User.findById(id);

    res.status(200).json(updatedData);
  } catch(err) {
    next(err, req, res)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    
    if (!id) {
      throw Error('Please enter ID');
    }
  
    const data = await User.findByIdAndDelete(id);
  
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser
}