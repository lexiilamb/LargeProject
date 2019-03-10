const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const expenseRoutes = express.Router();
const PORT = process.env.PORT || 4000; // "process.env.PORT" is Heroku's port if we're deploying there, then 4000 is a custom chosen port for dev testing
const path = require("path");
const dotenv = require("dotenv").config();
let Expense = require('./expense');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))
mongoose.connect('mongodb://Admin:Hello2@cluster0-shard-00-00-7dwwj.mongodb.net:27017,cluster0-shard-00-01-7dwwj.mongodb.net:27017,cluster0-shard-00-02-7dwwj.mongodb.net:27017/testLarge?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Route to return ALL expenses in the database.
expenseRoutes.get("/getAllExpenses", (req, res, next) => {
  const userId = "5c78ce86a484a23550339d6a";
  Expense.find({userId: userId})
		.select("_id userId description amount month day year")
		.exec()
		.then(docs => {
    const response = {
	  userId: userId,
	  total: docs.length,
	  expenses: docs.map(doc => {
	    return {
		  description: doc.description,
		  amount: doc.amount,
		  month: doc.month,
		  day: doc.day,
		  year: doc.year,
		}
	  })
	};
    res.status(200).json(response);
  })
  .catch(err => {
	console.log(err);
	res.status(500).json({
  	  error: err
	})
  });
});

expenseRoutes.route('/').get(function(req, res) {
    Expense.find(function(err, expenses) {
        if (err) {
            console.log(err);
        } else {
            res.json(expenses);
        }
    });
});
expenseRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Expense.findById(id, function(err, expense) {
        res.json(expense);
    });
});
expenseRoutes.route('/update/:id').post(function(req, res) {
    Expense.findById(req.params.id, function(err, expense) {
        if (!expense)
            res.status(404).send("data is not found");
        else
            expense.description = req.body.description;
            expense.amount = req.body.amount;
            expense.month = req.body.month;
            expense.year = req.body.year;
            expense.save().then(expense => {
                res.json('Expense updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
expenseRoutes.route('/add').post(function(req, res) {
    let expense = new Expense(req.body);
    expense.save()
        .then(expense => {
            res.status(200).json({'expense': 'expense added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new expense failed');
        });
});
app.use('/expenses', expenseRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});