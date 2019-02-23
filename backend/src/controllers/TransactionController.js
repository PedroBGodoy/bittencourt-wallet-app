const Transaction = require('../models/transaction');

module.exports = {
    async index(req, res){
        try{
            const transactions = await Transaction.find({ user: req.params.id }).sort('-madeAt')

            return res.json(transactions);
        }catch(err)
        {
            console.log(err)
        }
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