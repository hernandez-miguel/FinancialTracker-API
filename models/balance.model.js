const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema(
  {
    account: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    note: {
      type: String,
      required: false
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

const Balances = mongoose.model('Balances', balanceSchema);

module.exports = Balances;