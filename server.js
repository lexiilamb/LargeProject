const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
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
todoRoutes.route('/').get(function(req, res) {
    Expense.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Expense.findById(id, function(err, todo) {
        res.json(todo);
    });
});
todoRoutes.route('/update/:id').post(function(req, res) {
    Expense.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.description = req.body.description;
            todo.amount = req.body.amount;
            todo.month = req.body.month;
            todo.year = req.body.year;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save().then(todo => {
                res.json('Expense updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Expense(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});
app.use('/todos', todoRoutes);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});