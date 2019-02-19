const Transaction = require('../models/transaction');

module.exports = {
    async index(req, res){
        const transactions = await Transaction.find({}).sort('-madeAt')

        return res.json(transactions);
    },

    async store(req, res){
        const transaction = await Transaction.create(req.body);

        req.io.emit('transaction', transaction);

        return res.json(transaction);
    },

    async delete(req, res){
        const transaction = await Transaction.findByIdAndDelete(req.params.id)

        return res.json(transaction)
    }
};