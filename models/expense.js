const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
	expenseId: mongoose.Schema.Types.ObjectId,
	userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
	description: { type: String, required: true },
	amount: { type: Number, required: true },
	category: { type: String, required: false },
	month: { type: String, required: true },
	day: { type: Number, required: false },
	year: { type: Number, required: true},
	groupCode: { type: String, required: false}
});

module.exports = mongoose.model('Expense', expenseSchema);