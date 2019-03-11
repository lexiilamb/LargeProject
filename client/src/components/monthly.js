import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';
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
		
		this.onChangeMonth = this.onChangeMonth.bind(this);
		
        this.state = {
			todos: []};
    }
	
	onChangeMonth(month) {
		const obj = {
            changeMonth: month
        };
		
		console.log(obj);
        axios.get('expenses/month', obj)
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    componentDidMount() {
		const obj = {
            changeMonth: 'Jan'
        };
		
        axios.get('/expenses/month', obj)
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
                <h3><img src={logo} width="150" height="75" alt="CodingTheSmartWay.com" />Expense List<img src={logo} width="150" height="75" alt="CodingTheSmartWay.com" /></h3>
				<div className="container">
				  <nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="collpase navbar-collapse">
					  <ul className="navbar-nav mr-auto">
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('Jan')}}>Jan</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('Feb')}}>Feb</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('March')}}>March</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('April')}}>April</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('May')}}>May</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('June')}}>June</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('July')}}>July</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('Aug')}}>Aug</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('Sep')}}>Sep</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('Oct')}}>Oct</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('Nov')}}>Nov</button>
						  <button type="submit" class="btn btn-priority" onClick={() => {this.onChangeMonth('Dec')}}>Dec</button>
					  </ul>
					</div>
				  </nav>
				</div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
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