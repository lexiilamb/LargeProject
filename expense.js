const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let expenseSchema = new Schema({
	
    expenseId: mongoose.Schema.Types.ObjectId,
	userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
	
	description: {
        type: String,
		required: true
    },
    amount: {
        type: Number,
		required: true
    },
	month: {
        type: String,
		required: true
    },
	year: {
        type: Number,
		required: true
    }
});
module.exports = mongoose.model('Expense', expenseSchema);