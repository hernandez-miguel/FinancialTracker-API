const Balance = require('../models/balance.model'); 
const User = require('../models/user.model');

const getAllBalances = async (req, res, next) => {
  try {
    const data = await Balance.find({});
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const getBalancesByUser = async (req, res, next) => {
  try {
    let {id} = req.params;
    const data = await Balance.find({ user: id }).exec();
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const createBalance = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { year, cash, debt, investment } = req.body;

    const currUser = await User.findOne({ '_id': id }).exec();

    if (!currUser) {
      res.status(401);
      throw new Error('User not found');
    } 

    let data = new Balance({
        year: year,
        cash: cash,
        debt: debt,
        investment: investment,
        user: currUser._id
    })

    await data.save();
    
    currUser.balances.push(data);

    await currUser.save();
    
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const updateBalance = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await Balance.findByIdAndUpdate(id, req.body);

    if (!data) {
      res.status(404);
      throw new Error(`Cannot find balance with ID ${id}`);
    }

    const updatedData = await Balance.findById(id);
    res.status(200).json(updatedData);
  } catch(err) {
    next(err, req, res)
  }
}

const deleteBalance = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await Balance.findByIdAndDelete(id);
    
    if (!data) {
      res.status(404);
      throw new Error(`Cannot find balance with ID ${id}`);
    }
  
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

module.exports = {
  getAllBalances,
  getBalancesByUser,
  createBalance,
  updateBalance,
  deleteBalance
}