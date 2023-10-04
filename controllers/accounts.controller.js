const Account = require('../models/account.model'); 
const User = require('../models/user.model');

const getAllAccounts = async (req, res, next) => {
  try {
    const data = await Account.find({});
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const getAccountsByUser = async (req, res, next) => {
  try {
    let {id} = req.params;
    const data = await Account.find({ user: id }).exec();
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const createAccount = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { account, balance, category } = req.body;

    const currUser = await User.findOne({ '_id': id }).exec();

    if (!currUser) {
      res.status(401);
      throw new Error('User not found');
    } 

    let data = new Account({
        account: account,
        balance: balance,
        category: category,
        user: currUser._id
    })

    await data.save();
    
    currUser.accounts.push(data);

    await currUser.save();
    
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const updateAccount = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await Account.findByIdAndUpdate(id, req.body);

    if (!data) {
      res.status(404);
      throw new Error(`Cannot find account with ID ${id}`);
    }

    const updatedData = await Account.findById(id);
    res.status(200).json(updatedData);
  } catch(err) {
    next(err, req, res)
  }
}

const deleteAccount = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await Account.findByIdAndDelete(id);
    
    if (!data) {
      res.status(404);
      throw new Error(`Cannot find account with ID ${id}`);
    }
  
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

module.exports = {
  getAllAccounts,
  getAccountsByUser,
  createAccount,
  updateAccount,
  deleteAccount
}