import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from "../krabs.gif";

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
        this.state = {todos: []};
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

    todoList() {
        return this.state.todos.map(function(currentExpense, i){
            return <Expense item={currentExpense} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3><center>All Expenses</center></h3>
                <h5>Total: </h5>
                <table className="table table-striped" style={{ marginTop: 30 }} >
                    <thead class="thead-dark">
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Month</th>
                            <th>Day</th>
                            <th>Year</th>
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