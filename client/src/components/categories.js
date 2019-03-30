import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';
import logo from "../krabs.gif";

var temp = [];
var sum = 0;

const Expense = props => (
    <tr>
        <td>{props.item.description}</td>
        <td>{props.item.amount}</td>
        <td>{props.item.category}</td>
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
		
		this.onChangeCategory = this.onChangeCategory.bind(this);
		this.onChangeSort = this.onChangeSort.bind(this);
		
        this.state = {
			expensesArray: [],
			total: 0
		};
    }
	
	componentDidMount() {		
        axios.post('/expenses/category/Food')
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					expensesArray: temp,
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeCategory(category) {
        axios.post('expenses/category/'+category)
            .then(response => {
				temp = response.data;
				temp = sortBy(temp, ['description', 'amount']);
				sum = sumBy(temp, 'amount');
                this.setState({ 
					expensesArray: temp,
					total: sum
				});
            })
            .catch(function (error){
                console.log(error);
            })
    }
	
	onChangeSort(sortItem) {
		temp = this.state.expensesArray;
		temp = sortBy(temp, sortItem);
		sum = sumBy(temp, 'amount');
		this.setState({ 
			expensesArray: temp,
			total: sum
		});
    }

    listOfExpenses() {
        return this.state.expensesArray.map(function(currentExpense, i){
            return <Expense item={currentExpense} key={i} />;
        })
    }

    render() {
        return (
            <div>
              <h3><center><img src={logo} width="150" height="75" alt=""/>	Monthly Lists	<img src={logo} width="150" height="75" alt="" /></center></h3>
			  <h5>Total: ${this.state.total} </h5>
				<div className="container">
				  <nav className="navbar navbar-expand-sm navbar-light bg-light">
					<div className="collpase navbar-collapse">
					  <ul className="navbar-nav mr-auto">
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Food')}}>Food</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Bills')}}>Bills</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Entertainment')}}>Entertainment</button>
						  <button type="submit" className="btn btn-priority" onClick={() => {this.onChangeCategory('Other')}}>Other/Misc.</button>
					  </ul>
					</div>
				  </nav>
				</div>
                <table className="table table-striped table-bordered" 
				  style={{ marginTop: 30 }} >
				  
                    <thead className="thead-dark">
                        <tr>
                            <th data-field="description" 
								onClick={() => {this.onChangeSort('description')}
								}>Description</th>
                            <th data-field="amount" 
								onClick={() => {this.onChangeSort('amount')}
								}>Amount</th>
							<th data-field="category" 
								onClick={() => {this.onChangeSort('category')}
								}>Category</th>
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
                        { this.listOfExpenses() }
                    </tbody>
                </table>
            </div>
        )
    }
}