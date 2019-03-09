const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let expenseSchema = new Schema({
    description: {
        type: String
    },
    amount: {
        type: Number
    },
	month: {
        type: String
    },
	year: {
        type: Number
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
});
module.exports = mongoose.model('Expense', expenseSchema);