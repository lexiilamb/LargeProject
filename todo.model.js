const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Todo = new Schema({
    todo_description: {
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
module.exports = mongoose.model('Todo', Todo);