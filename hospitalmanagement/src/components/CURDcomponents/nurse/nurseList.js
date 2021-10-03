import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './../../adminNav';
import DoctorNav from './../../doctorNav';
import { ServiceClass } from './../../../service/service';
class nurseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nurse: [],
            Staff: [],
            StaffHead: [],
            message: '',
            columnHeaders: []
        };
        this.service = new ServiceClass();
    }

    loadData(token) {
        this.service.
        getNurseData(token).then(response => {
            console.log(response.data.message);
            this.setState({ Nurse: response.data.message }, () => {
                this.setState({ message: `Data Received Successfully` });
                this.setState(
                    { columnHeaders: Object.keys(this.state.Nurse[0]) },
                    () => {
                        console.log(`Columns ${this.state.columnHeaders}`);
                    }
                );
                console.log(this.state.Nurse);
            });
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        this.loadData(token);
    };
    render() {
        return (
            <div>
                <div className="container-fluid">
                {
                    window.sessionStorage.getItem("role") === "Admin" && <AdminNav history={this.props.history} /> 
                }
                </div>
                <div className="mt-4">
                    <Link to="/addNurse" style={{ textDecoration: "none" }}><button className="btn text-white btn-dark" name="addNurse">
                        Add Nurse
                    </button></Link>
                </div>
                <table className="table table-bordered table-striped container mt-5">
                    <thead>
                        <tr>
                            {this.state.columnHeaders.map((head, idx) => (
                                <th key={idx}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Nurse.map((dept, idx) => (
                            <tr key={idx}>
                                {this.state.columnHeaders.map((head, i) => (
                                    <td key={i}>{dept[head]}</td>
                                ))}
                                <td>
                                    <button className="btn btn-warning">
                                        <Link to={`/edit/${dept.DeptNo}`}>Edit</Link>
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default nurseList;
