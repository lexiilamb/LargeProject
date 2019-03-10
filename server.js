var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001; // "process.env.PORT" is Heroku's port if we're deploying there, then 4000 is a custom chosen port for dev testing


// this is our MongoDB database
const dbRoute = "mongodb://Admin:Hello2@cluster0-shard-00-00-7dwwj.mongodb.net:27017,cluster0-shard-00-01-7dwwj.mongodb.net:27017,cluster0-shard-00-02-7dwwj.mongodb.net:27017/testEXP?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);


require('./models/expense');
require('./models/user');

var expenseRouter = require('./routes/expenses');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes which should handle requests
app.use('/user', userRouter);
app.use('/expenses', expenseRouter);

app.use((req, res, next) =>{
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	})
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// launch our backend into a port
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});