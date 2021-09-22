import React, { Component } from "react";

class Calc extends Component {
  // define a state in the constructor
  // the 'props' represents the data received from the parent
  constructor(props) {
    super(props);
    // defining the lcoal state
    this.state = {
      result: "",
      disres: ""
    };
  }
  // evt is the event raised on the HTML element where the handleFirstNameChange function is
  // bound
  handleAllInputChanges(evt){
    let e = evt.target.value;
    if(evt.target.name === "="){
		try {
            this.setState({
                disres: eval(this.state.result),
            })
        } catch (e) {
            this.setState({
                result: "error",
                disres: "error"
            })
        }
	}else if(evt.target.name === "C"){
		this.setState({
			disres: "",
      result: ""
		})
	}else if(evt.target.name === "CE"){
		this.setState({
            result: this.state.result.slice(0, -1),
            disres: this.state.disres.slice(0, -1)
        })
	}
	else{
		if(e === 'sin(' || e==='cos(' || e==='tan(' || e==='sqrt(' || e==='log(' || e==='⫪'){
      this.setState({result : evt.target.id})
      this.setState({disres:evt.target.value})
    }else{
      this.setState({
        result: this.state.result + evt.target.name,
        disres: this.state.disres + evt.target.name
      })
    }
	}
  } 
  
  render() {
    return (
      <div className="container">
        <div className=" row align-items-center">
        <div className="col-4 border">
        <input type="text" value={this.state.disres} /><br/>
    

        
        
    <button name="CE" className="btn btn-large btn-warning" onClick={this.handleAllInputChanges.bind(this)}>CE</button>
    
    <button name="C" className="btn btn-large btn-warning" onClick={this.handleAllInputChanges.bind(this)}>C</button><br/>


    <button name="1" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>1</button>
    <button name="2" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>2</button>
    <button name="3" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>3</button>
    <button name="+" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>+</button>
    <button value="sin(" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)} id='Math.sin(' >Sin</button>
    <button value="cos(" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)} id='Math.cos('>Cos</button>
    <button value="tan(" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}id='Math.tan('>tan</button>
    <br/>


    <button name="4" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>4</button>
    <button name="5" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>5</button>
    <button name="6" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>6</button>
    <button name="-" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>-</button>
    <button value="sqrt(" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)} id='Math.sqrt('>sqrt</button>
    <button value="log(" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)} id='Math.log('>log</button>
    <button value="⫪" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)} id='Math.PI'>⫪</button>
    <br/>

    <button name="7" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>7</button>
    <button name="8" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>8</button>
    <button name="9" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>9</button>
    <button name="*" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>x</button>
    <button name="/" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>÷</button>
    <button name="(" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>(</button>
      <button name=")" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>)</button>
    <br/>


    <button name="." className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>.</button>
    <button name="0" className="btn btn-large btn-light m-1" onClick={this.handleAllInputChanges.bind(this)}>0</button>
    <button name="=" className="btn btn-large btn-success m-1" onClick={this.handleAllInputChanges.bind(this)}>=</button>
    
        </div>
		
      </div>
      </div>
    );
  }
}
export default Calc;
