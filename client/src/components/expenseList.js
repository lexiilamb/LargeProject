import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

var temp = [];
var i = 0;
var sum = 0;
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
			total: 0,
			i: 0
		};
    }

    componentDidMount() {
        axios.get('/expenses/getAllExpenses')
            .then(response => {
				temp = response.data;
				temp.sort(function(a,b) {
					return a.description > b.description;
				});
                this.setState({ todos: temp });
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
		sum = 0;
		length = this.state.todos.length;
		for(i; i <length; i++)
			sum += this.state.todos[this.state.i].amount;
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
                            <th onClick={() => {this.onChangeSort('description')}}>Description</th>
                            <th onClick={() => {this.onChangeSort('amount')}}>Amount</th>
                            <th onClick={() => {this.onChangeSort('month')}}>Month</th>
                            <th onClick={() => {this.onChangeSort('day')}}>Day</th>
                            <th onClick={() => {this.onChangeSort('year')}}>Year</th>
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