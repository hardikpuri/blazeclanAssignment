import React, { Component } from "react";

class Radio extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }
    handleChanged=(evt)=>{
        this.setState({data:evt.target.value},()=>this.props.onChange(this.state.data));
    }
    render(){
        return(
            this.props.dataSource.map((rec, idx) => (
                <label key={idx}>
                <input type="radio"   name='radio' value={rec} onChange={this.handleChanged.bind(this)} />
                {rec}
                </label>
            ))
        );
    }
}
export default Radio;