import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PORT = process.env.PORT || 4000; // "process.env.PORT" is Heroku's port if we're deploying there, then 4000 is a custom chosen port for dev testing

const Expense = props => (
    <tr>
        <td>{props.todo.description}</td>
        <td>{props.todo.amount}</td>
        <td>{props.todo.month}</td>
        <td>{props.todo.year}</td>
        //<td>
            //<Link to={"/edit/"+props.todo._id}>Edit</Link>
        //</td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('/expenses/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Expense todo={currentTodo} key={i} />;
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