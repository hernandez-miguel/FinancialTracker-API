const Expense = require('../models/expense.model');
const User = require('../models/user.model');

const getAllExpenses = async (req, res, next) => {
  try {
    const data = await Expense.find({});
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const getExpense = async (req, res, next) => {
  try {
    let {id} = req.params;
    const data = await Expense.find({ user: id }).exec();
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const createExpense = async (req, res, next) => {
  try {
    const {id} = req.params;
    const { merchant, date, amount } = req.body;
    const { category, note } = req.body;

    const currUser = await User.findOne({ '_id': id }).exec();

    if (!currUser) {
      res.status(401);
      throw new Error('Email does not exist');
    } 

    let data = new Expense({
        merchant: merchant,
        date: date,
        amount: amount,
        category: category,
        note: note,
        user: currUser._id
    })

    await data.save();
    
    currUser.expenses.push(data);

    await currUser.save();
    
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const updateExpense = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await Expense.findByIdAndUpdate(id, req.body);

    if (!data) {
      res.status(404);
      throw new Error(`Cannot find expense with ID ${id}`);
    }

    const updatedData = await Expense.findById(id);
    res.status(200).json(updatedData);
  } catch(err) {
    next(err, req, res)
  }
}

const deleteExpense = async (req, res, next) => {
  try {
    const {id} = req.params;
    const data = await Expense.findByIdAndDelete(id);
    
    if (!data) {
      res.status(404);
      throw new Error(`Cannot find expense with ID ${id}`);
    }
  
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

module.exports = {
  getAllExpenses,
  getExpense,
  updateExpense,
  createExpense, 
  deleteExpense
}