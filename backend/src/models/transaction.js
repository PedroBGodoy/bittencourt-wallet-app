const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transactionDescription: String,
    transactionValue: Number,
    transactionType: Boolean, // True = Add False = Remove
    madeAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);