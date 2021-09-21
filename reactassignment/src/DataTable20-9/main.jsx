import React, { Component } from 'react';
import DataTable from './DataTableComponent';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            employees: [
                {
                    Eno: 0,
                    EmpName: "Hardik",
                    Position: "Manager",
                    Salary: 1200000
                },
                {
                    Eno: 2,
                    EmpName: "Siddharth",
                    Position: "Manager",
                    Salary: 12000
                },
                {
                    Eno: 3,
                    EmpName: "Anshul",
                    Position: "Manager",
                    Salary: 120000
                },
                {
                    Eno: 2,
                    EmpName: "Siddharth",
                    Position: "Manager",
                    Salary: 12000
                },                {
                    Eno: 2,
                    EmpName: "Siddharth",
                    Position: "Manager",
                    Salary: 12000
                },                {
                    Eno: 2,
                    EmpName: "Siddharth",
                    Position: "Manager",
                    Salary: 12000
                },                {
                    Eno: 2,
                    EmpName: "Siddharth",
                    Position: "Manager",
                    Salary: 12000
                },                {
                    Eno: 2,
                    EmpName: "Siddharth",
                    Position: "Manager",
                    Salary: 12000
                },
            ],
         }
    }
    render() { 
        return ( 
            <div className="container m-5 p-5">
                <DataTable headers= {Object.keys(this.state.employees[0])} data={this.state.employees} canSort={true}
             sortKey={"Salary"} canDelete={true} isPagination={false} pageSize={5}></DataTable>
            </div>
         );
    }
}

export default Main;