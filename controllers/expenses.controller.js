const Expense = require('../models/expense.model');

const getExpense = async (req, res, next) => {
  try {
    let {id} = req.params;
    let data;

    if(id) {
      data = await Expense.findById(id);
    } else {
      data = await Expense.find({});
    }

    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
}

const UpdateExpense = async (req, res, next) => {
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

const createExpense = async (req, res, next) => {
  try {
    const data = await Expense.create(req.body);
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
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
  getExpense,
  UpdateExpense,
  createExpense, 
  deleteExpense
}