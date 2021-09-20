import React, { Component } from 'react';
class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
			EmpNo: "1",
			EmpName: "",
			Salary: 0,
			Position: "",
			data: this.props.data
		 }
		this.canSort();
		//this.show();
		//this.canDelete();
		//this.show = this.show.bind(this);
    }
	show(){
		return(
			this.props.data.map((emp,idx)=>(
				<tr key={idx} onClick={()=>this.getSelectedEmployeeFromTable(emp)}>
					{
						this.props.headers.map((head,i)=>( 
							<td key={i}>
								{emp[head]}
							</td>
						))	
					}
				
				</tr>
			))
		)
	}
	Delete(e){
		console.log("in delete");
		const index = this.props.data.findIndex(x => x.Eno === this.state.EmpNo);
		this.props.data.splice(index,1);
		//this.props.data = this.state.data;
		console.log("Deleted");
		//this.render();
		//document.getElementById("tbody").innerHTML =this.show();
	}
	canDelete(){
		if(this.props.canDelete === true){
			console.log("in can delete");
			//console.log(document.getElementById("delete"));
			//document.getElementById("delete").innerHTML = `<input type = 'button' value = 'Delete' class='btn btn-danger' onClick='{()=>this.Delete()}'>`;
		}
	}
	canSort(){
		if (this.props.canSort === true) {
			this.props.data.sort(this.sortByProperty(`${this.props.sortKey}`));  
		}
	}
	sortByProperty(property){  
		return function(a,b){  
		   if(a[property] > b[property])  
			  return 1;  
		   else if(a[property] < b[property])  
			  return -1;  
	   
		   return 0;  
		}  
	 }
	getSelectedEmployeeFromTable=(emp)=>{
		//alert(`Selected Employee ${JSON.stringify(emp)} `);
		this.canDelete();
		this.setState({ EmpNo: emp.Eno });
    	this.setState({ EmpName: emp.EmpName });
		this.setState({ Salary: emp.Salary });
		this.setState({ Position: emp.Position });
	}
    render() { 
        return (
            <div>
				<form>
          <div className="form-group">
            <label>EmpNo</label>
            <input
              type="text"
              name="EmpNo"
              className="form-control"
              value={this.state.EmpNo}
            />
          </div>
          <div className="form-group">
            <label>EmpName</label>
            <input
              type="text"
              name="EmpName"
              className="form-control"
              value={this.state.EmpName}
            />
          </div>
          <div className="form-group">
            <label>Salary</label>
            <input
              type="text"
              className="form-control"
              name="Salary"
              value={this.state.Salary}
            />
          </div>
		  <div className="form-group">
            <label>Position</label>
            <input
              type="text"
              className="form-control"
              name="Position"
              value={this.state.Position}
            />
          </div>
          <div className="form-group btn-group" id="delete">
		  		<input type = 'button' value = 'Delete' className='btn btn-danger' onClick={()=>this.Delete()}></input>
          </div>
        </form>
				<table className="table table-bordered table-striped">
            	<thead>
					<tr>
						{this.props.headers.map((head, idx) => (
						<th key={idx}>{head}</th>
						))}
					</tr>
            	</thead>
				<tbody id="tbody">
                { 
                    this.show()
                }
            	</tbody>
			
          	</table>
		  	Selected Record Is:
			<div id ="selected"></div>
		</div>

          );
    }
}
 
export default DataTable;