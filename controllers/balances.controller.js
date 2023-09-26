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

const getUserBalance = async (req, res, next) => {
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
    const { account, amount, year } = req.body;
    const { category, note } = req.body;

    const currUser = await User.findOne({ '_id': id }).exec();

    if (!currUser) {
      res.status(401);
      throw new Error('User not found');
    } 

    let data = new Balance({
        account: account,
        year: year,
        amount: amount,
        category: category,
        note: note,
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
  getUserBalance,
  createBalance,
  updateBalance,
  deleteBalance
}