const Balance = require('../models/balanceModel'); 

const getBalance = async (req, res, next) => {
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
}

const createBalance = async (req, res, next) => {
  try {
    const data = await Balance.create(req.body);
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
  getBalance,
  createBalance,
  updateBalance,
  deleteBalance
}