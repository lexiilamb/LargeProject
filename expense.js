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
	year: {
        type: Number,
		required: true
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});
module.exports = mongoose.model('Expense', expenseSchema);