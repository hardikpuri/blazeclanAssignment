import React, { Component } from "react";

class Calc extends Component {
  // define a state in the constructor
  // the 'props' represents the data received from the parent
  constructor(props) {
    super(props);
    // defining the lcoal state
    this.state = {
      result: ""
    };
  }
  // evt is the event raised on the HTML element where the handleFirstNameChange function is
  // bound
  handleAllInputChanges(evt){
    if(evt.target.name === "="){
		try {
            this.setState({
                result: eval(this.state.result)
            })
        } catch (e) {
            this.setState({
                result: "error"
            })
        }
	}else if(evt.target.name === "C"){
		this.setState({
			result: ""
		})
	}else if(evt.target.name === "CE"){
		this.setState({
            result: this.state.result.slice(0, -1)
        })
	}
	else{
		this.setState({
			result: this.state.result + evt.target.name
		})
	}
  } 
  showFullName(){
    // update the fuullName based on updated values of other state properties
    this.setState({fullName: `${this.state.firstName} ${this.state.middleName} ${this.state.lastName}`.toUpperCase()});
  }
  render() {
    return (
      <div className="container">
		<input type="text" value={this.state.result} /><br/>
        <button name="(" onClick={this.handleAllInputChanges.bind(this)}>(</button>
        <button name="CE" onClick={this.handleAllInputChanges.bind(this)}>CE</button>
        <button name=")" onClick={this.handleAllInputChanges.bind(this)}>)</button>
        <button name="C" onClick={this.handleAllInputChanges.bind(this)}>C</button><br/>


        <button name="1" onClick={this.handleAllInputChanges.bind(this)}>1</button>
        <button name="2" onClick={this.handleAllInputChanges.bind(this)}>2</button>
        <button name="3" onClick={this.handleAllInputChanges.bind(this)}>3</button>
        <button name="+" onClick={this.handleAllInputChanges.bind(this)}>+</button><br/>


        <button name="4" onClick={this.handleAllInputChanges.bind(this)}>4</button>
        <button name="5" onClick={this.handleAllInputChanges.bind(this)}>5</button>
        <button name="6" onClick={this.handleAllInputChanges.bind(this)}>6</button>
        <button name="-" onClick={this.handleAllInputChanges.bind(this)}>-</button><br/>

        <button name="7" onClick={this.handleAllInputChanges.bind(this)}>7</button>
        <button name="8" onClick={this.handleAllInputChanges.bind(this)}>8</button>
        <button name="9" onClick={this.handleAllInputChanges.bind(this)}>9</button>
        <button name="*" onClick={this.handleAllInputChanges.bind(this)}>x</button><br/>


        <button name="." onClick={this.handleAllInputChanges.bind(this)}>.</button>
        <button name="0" onClick={this.handleAllInputChanges.bind(this)}>0</button>
        <button name="=" onClick={this.handleAllInputChanges.bind(this)}>=</button>
        <button name="/" onClick={this.handleAllInputChanges.bind(this)}>÷</button><br/>
      </div>
    );
  }
}
export default Calc;
