import React, { Component } from "react";
import DropDown from "./dropdown";
class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
           
            data:["Pizza","Pasta","Burger","Frappe","French Fries","Coke"],
            selectedData:[]
        };
    }
    getSelectedItems=(sel)=>{
        this.setState({selectedData:sel},()=>console.log('updated'));
    }

    render(){
        return(
        <div className='container'>
            <div className="p-5 m-5">
                <div>
                <form className='form'>
                    <div className="form-group">
                    <label className='text-danger'>Designation</label>
                    <DropDown dataSource={this.state.data} selectedValues={this.getSelectedItems.bind(this)}/>
                    </div>
                    </form>
                </div>
            
            <div>
                <strong>Selected items: </strong>
                <ul>
                {this.state.selectedData.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                ))}
                </ul>
            </div>
            </div>
            </div>
        );
    }
}

export default Main;