const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let expenseSchema = new Schema({
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
	day: {
        type: Number,
		required: false
    },
	year: {
        type: Number,
		required: true
    },
    todo_priority: {
        type: String,
		required: true
    },
    todo_completed: {
        type: Boolean,
		required: true
    }
});
module.exports = mongoose.model('Expense', expenseSchema);