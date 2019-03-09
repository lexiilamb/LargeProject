import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PORT = process.env.PORT || 4000; // "process.env.PORT" is Heroku's port if we're deploying there, then 4000 is a custom chosen port for dev testing

const Expense = props => (
    <tr>
        <td className={props.expense.todo_completed ? 'completed' : ''}>{props.expense.description}</td>
        <td className={props.expense.todo_completed ? 'completed' : ''}>{props.expense.amount}</td>
        <td className={props.expense.todo_completed ? 'completed' : ''}>{props.expense.month}</td>
        <td className={props.expense.todo_completed ? 'completed' : ''}>{props.expense.year}</td>
        <td className={props.expense.todo_completed ? 'completed' : ''}>{props.expense.todo_priority}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.amount}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.expense._id}>Edit</Link>
        </td>
    </tr>
)

export default class ExpenseList extends Component {

    constructor(props) {
        super(props);
        this.state = {expenses: []};
    }

    componentDidMount() {
        axios.get('/expenses/')
            .then(response => {
                this.setState({ expenses: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    expenseList() {
        return this.state.expenses.map(function(currentExpense, i){
            return <Expense expense={currentExpense} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Expense List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.expenseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}