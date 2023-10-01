const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema(
  {
    year: {
      type: Number,
      required: true
    },
    cash: {
      type: Number,
      required: true
    },
    debt: {
      type: Number,
      required: true
    },
    investment: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }, 
  {
    timestamps: true
  }
)

const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;