import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

var temp = [];
var i = 0;
var sum = 1;
var length = 0;

const Expense = props => (
    <tr>
        <td>{props.item.description}</td>
        <td>{props.item.amount}</td>
        <td>{props.item.month}</td>
        <td>{props.item.day}</td>
        <td>{props.item.year}</td>
        <td>
            <Link to={"/edit/"+props.item._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {
			todos: [],
			total: 2
		};
    }

    componentDidMount() {
        axios.get('/expenses/getAllExpenses')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeSort(sort) {
		temp = this.state.todos;
		temp.sort(function(a, b) {
			return a.sort > b.sort;
		});
		this.setState({ todos: temp });
		console.log(temp);
    }

    todoList() {
        return this.state.todos.map(function(currentExpense, i){
            return <Expense item={currentExpense} key={i} />;
        })
    }
	
	totalAmount(listOfExpenses) {
		i = 0;
		sum = 1;
		length = this.state.todos.length;
		for(i; i <length; i++)
			sum += this.state.todos[i].amount;
		this.setState({ total: sum });
		console.log(sum);
	}

    render() {	
        return (
            <div>
                <h3><center>All Expenses</center></h3>
                <h5>Total: ${this.state.total} </h5>
                <table data-sort-name="description" 
				  data-sort-order="desc" 
				  className="table table-striped table-bordered" 
				  style={{ marginTop: 30 }} >
				  
                    <thead className="thead-dark">
                        <tr>
                            <th data-field="description" 
								onClick={() => {this.onChangeSort('description')}
								}>Description</th>
                            <th data-field="amount" 
								onClick={() => {this.onChangeSort('amount')}
								}>Amount</th>
                            <th data-field="month" 
								onClick={() => {this.onChangeSort('month')}
								}>Month</th>
                            <th data-field="day" 
								onClick={() => {this.onChangeSort('day')}
								}>Day</th>
                            <th data-field="year" 
								onClick={() => {this.onChangeSort('year')}
								}>Year</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}