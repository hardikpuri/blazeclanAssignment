import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './../../adminNav';
import DoctorNav from './../../doctorNav';
import NurseNav from './../../nurseNav';
import ReceptionNav from './../../receptionNav';
import { ServiceClass } from './../../../service/service';
class doctorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Doctors: [],
            Staff: [],
            StaffHead: [],
            message: '',
            columnHeaders: []
        };
        this.service = new ServiceClass();
    }

    loadData(token) {
        this.service.
        getDoctorData(token).then(response => {
            console.log(response.data.message);
            this.setState({ Doctors: response.data.message }, () => {
                this.setState({ message: `Data Received Successfully` });
                this.setState(
                    { columnHeaders: Object.keys(this.state.Doctors[0]) },
                    () => {
                        console.log(`Columns ${this.state.columnHeaders}`);
                    }
                );
                console.log(this.state.Doctors);
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
                {
                    window.sessionStorage.getItem("role") === "Doctor" && <DoctorNav history={this.props.history} /> 
                }
                {
                    window.sessionStorage.getItem("role") === "Nurse" && <NurseNav history={this.props.history} /> 
                }
                {
                    window.sessionStorage.getItem("role") === "Reception" && <ReceptionNav history={this.props.history} /> 
                }
                </div>
                <div className="mt-4">
                {
                    window.sessionStorage.getItem("role") === "Admin" && <Link to="/addDoctor" style={{ textDecoration: "none" }}><button className="btn text-white btn-dark" name="addDoctor">
                    Add Doctor
                </button></Link> 
                }
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
                        {this.state.Doctors.map((dept, idx) => (
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

export default doctorList;
