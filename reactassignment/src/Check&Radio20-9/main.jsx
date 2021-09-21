import React, { Component } from "react";
import Radio from "./radio";
import Checkbox from "./checkbox";

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
           
            data:["Pizza","Pasta","Burger","Frappe","French Fries","Coke"],
            checkboxData:[],
            radioBox:''
        };
    }
    handleOnChangeCheckbox(checkList) {
       
        this.setState({
          checkboxData: checkList
        },()=>console.log('updated'));
      }
      handleOnChangeRadio(radioList){
          this.setState({radioBox:radioList});
      }
    render(){
        return(
            <div className='container'>
                
                <div className='m-5 p-5'>
                <Checkbox dataSource={this.state.data} onChange={this.handleOnChangeCheckbox.bind(this)}/>
                
                <div>
                    Checked Box List<br/>
                    <ul>
                        {this.state.checkboxData.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                ))}
                    </ul>
                    
                </div>
                </div>
                <div className="m-5 p-5">
                <Radio dataSource={this.state.data} onChange={this.handleOnChangeRadio.bind(this)}/>
                <div>
                    Radio Selected Item:{this.state.radioBox}
                </div>
                </div>
            </div>
        );
    }
}
export default Main;