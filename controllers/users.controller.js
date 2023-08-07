const User = require('../models/user.model');

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
    const data = await User.findByIdAndUpdate(id, req.body);

    if (!data) {
      res.status(404);
      throw new Error(`Cannot find user with ID ${id}`);
    }

    const updatedData = await User.findById(id);
    res.status(200).json(updatedData);
  } catch(err) {
    next(err, req, res)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await User.findByIdAndDelete(id);
    
    if (!data) {
      res.status(404);
      throw new Error(`Cannot find user with ID ${id}`);
    }
  
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