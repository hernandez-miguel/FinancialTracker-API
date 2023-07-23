const express = require('express');
const Expense = require('../models/expenseModel'); 

const expenseRouter = express.Router();

expenseRouter.get('/expenses/:id?', async(req, res, next) => {
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
})

expenseRouter.post('/expenses', async(req, res, next) => {
  try {
    const data = await Expense.create(req.body);
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
})

expenseRouter.put('/expenses/:id?', async(req, res, next) => {
  try {
    const {id} = req.params;

    if (!id) {
      throw Error('Please enter ID');
    }

    const dataToUpdate = await Expense.findByIdAndUpdate(id, req.body);
    const updatedData = await Expense.findById(id);

    res.status(200).json(updatedData);
  } catch(err) {
    next(err, req, res)
  }
})

expenseRouter.delete('/expenses/:id?', async(req, res, next) => {
try {
  const {id} = req.params;
  
  if (!id) {
    throw Error('Please enter ID');
  }

  const data = await Expense.findByIdAndDelete(id);

  res.status(200).json(data);
} catch(err) {
  next(err, req, res);
}
})

module.exports = expenseRouter;