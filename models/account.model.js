const mongoose = require('mongoose');

const accountSchema = mongoose.Schema(
  {
    account: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    prevBalance: {
      type: Number,
      required: false
    },
    netChg: {
      type: Number,
      required: false
    },
    percentChg: {
      type: Number,
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

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;