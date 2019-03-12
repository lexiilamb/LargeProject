import React, { Component } from 'react';
import axios from 'axios';

export default class CreateExpense extends Component {

    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
		this.onChangeMonth = this.onChangeMonth.bind(this);
		this.onChangeDay = this.onChangeDay.bind(this);
		this.onChangeYear = this.onChangeYear.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
            amount: '',
            month: '',
            day: '',
            year: ''
        }
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
            month: e
        });
    }
	
	onChangeDay(e) {
        this.setState({
            day: e.target.value
        });
    }
	
	onChangeYear(e) {
        this.setState({
            year: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Description: ${this.state.description}`);
        console.log(`Amount: ${this.state.amount}`);
		console.log(`Month: ${this.state.month}`);
		console.log(`Day: ${this.state.day}`);
		console.log(`Year: ${this.state.year}`);
     
        const newExpense = {
			userId: "5c78ce86a484a23550339d6a",
            description: this.state.description,
            amount: this.state.amount,
            month: this.state.month,
            day: this.state.day,
            year: this.state.year
        };

        axios.post('/expenses/add', newExpense)
            .then(res => console.log(res.data));
 
		this.setState = {
            description: '',
            amount: '',
            month: '',
            day: '',
            year: ''
        }
		
		this.props.history.push('/');
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Expense</h3>
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
					  <label class="mr-sm-2" for="inlineFormCustomSelect">Month: </label>
					  <select value={this.state.month} class="custom-select mr-sm-2" id="inlineFormCustomSelect">
						<option selected>Choose...</option>
						<option value={"Jan"} onChange={this.onChangeMonth()}>Jan</option>
						<option value={"Feb"} onChange={this.onChangeMonth()}>Feb</option>
					  </select>
					</div>
	
					<div className="form-group"> 
                        <label>Day: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.day}
                                onChange={this.onChangeDay}
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

                    <div className="form-group">
                        <input type="submit" value="Create Expense" className="btn btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}