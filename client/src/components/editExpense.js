import React, { Component } from 'react';
import axios from 'axios';

const PORT = process.env.PORT || 4000; // "process.env.PORT" is Heroku's port if we're deploying there, then 4000 is a custom chosen port for dev testing

export default class EditExpense extends Component {

    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
		this.onChangeMonth = this.onChangeMonth.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            amount: '',
            month: '',
            year: ''
        }
    }

    componentDidMount() {
        axios.get('/expenses/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    amount: response.data.amount,
					month: response.data.month,
					year: response.data.year
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }
	
	onChangeMonth(e) {
        this.setState({
            month: e.target.value
        });
    }
	
	onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            description: this.state.description,
            amount: this.state.amount,
            month: this.state.month,
            year: this.state.year
        };
        console.log(obj);
        axios.post('/expenses/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }
	
	onDelete(e) {
		e.preventDefault();
		
        axios.delete('/expenses/delete/'+this.props.match.params.id)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Expense</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Amount: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.amount}
                                onChange={this.onChangeAmount}
                                />
                    </div>
					<div className="form-group"> 
                        <label>Month: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.month}
                                onChange={this.onChangeMonth}
                                />
                    </div>
					<div className="form-group"> 
                        <label>Year: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.year}
                                onChange={this.onChangeYear}
                                />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Expense" className="btn btn-success" />
                    </div>
                </form>
				
				<form onDelete={this.onDelete}>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Delete Expense" className="btn btn-danger" />
                    </div>
                </form>
            </div>
        )
    }
}