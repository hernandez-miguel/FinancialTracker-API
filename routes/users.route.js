const express = require('express');
const User = require('../models/userModel'); 

const router = express.Router();

router.get('/:id?', async(req, res, next) => {
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
})

router.post('/', async(req, res, next) => {
  try {
    const data = await User.create(req.body);
    res.status(200).json(data);
  } catch(err) {
    next(err, req, res);
  }
})

router.put('/:id?', async(req, res, next) => {
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
})

router.delete('/:id?', async(req, res, next) => {
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
})

module.exports = router;