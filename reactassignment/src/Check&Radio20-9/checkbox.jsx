import React, { Component } from "react";

class Checkbox extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    handleChanged=(evt)=>{
        let temp=this.state.data;
        if(evt.target.checked === true){
            temp.push(evt.target.value)
        }else{
            let ind= temp.findIndex(x =>x === evt.target.value)
            if(ind!==-1)
            {temp.splice(ind,1)}
        }
       this.setState({data:temp},()=>this.props.onChange(this.state.data));
        
    }
    render(){
        return(
            this.props.dataSource.map((rec, idx) => (
                <label key={idx}>
                <input type="checkbox"  name="check" title={rec} value={rec} onChange={this.handleChanged.bind(this)}  />
                {rec}
                </label>
            ))
        );
    }
}
export default Checkbox;