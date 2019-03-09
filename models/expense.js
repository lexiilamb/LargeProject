const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
	expenseId: mongoose.Schema.Types.ObjectId,
	userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
	expenseDescription: { type: String, required: true },
	expenseAmount: { type: Number, required: true },
	month: { type: String, required: true },
	day: { type: String, required: false },
	year: { type: Number, required: true}
});

module.exports = mongoose.model('Expense', expenseSchema);