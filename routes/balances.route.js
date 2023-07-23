const express = require('express');
const Balance = require('../models/balanceModel'); 

const balanceRouter = express.Router();

balanceRouter.get('/balances/:id?', async(req, res, next) => {
  try {
    let {id} = req.params;
    let data;

    if(id) {
      data = await Balance.findById(id);
    } else {
      data = await Balance.find({});
    }

    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
})

balanceRouter.post('/balances', async(req, res, next) => {
  try {
    const data = await Balance.create(req.body);
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
})

balanceRouter.put('/balances/:id?', async(req, res, next) => {
  try {
    const {id} = req.params;

    if (!id) {
      throw Error('Please enter ID');
    }

    const dataToUpdate = await Balance.findByIdAndUpdate(id, req.body);
    const updatedData = await Balance.findById(id);

    res.status(200).json(updatedData);
  } catch(err) {
    next(err, req, res)
  }
})

balanceRouter.delete('/balances/:id?', async(req, res, next) => {
try {
  const {id} = req.params;
  
  if (!id) {
    throw Error('Please enter ID');
  }

  const data = await Balance.findByIdAndDelete(id);

  res.status(200).json(data);
} catch(err) {
  next(err, req, res);
}
})

module.exports = balanceRouter;