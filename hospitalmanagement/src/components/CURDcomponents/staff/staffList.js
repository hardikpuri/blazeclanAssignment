import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './../../adminNav';
import DoctorNav from './../../doctorNav';
import NurseNave from './../../nurseNav';
import { ServiceClass } from "../../../service/service";
class staffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Staff: [],
            StaffHead: [],
            message: '',
        };
        this.service = new ServiceClass();
    }

    loadData(token) {
        this.service.
            getStaffData(token).then(response => {
            console.log(response.data.message);
            this.setState({ Staff: response.data.message }, () => {
                this.setState({ message: `Data Received Successfully` });
                this.setState(
                    { StaffHead: Object.keys(this.state.Staff[0]) },
                    () => {
                        console.log(`Columns ${this.state.StaffHead}`);
                    }
                );
                console.log(this.state.Staff);
            });
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        this.loadData(token);
    };
    home() {
        this.props.history.push("/adminHome");
    }
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
                        window.sessionStorage.getItem("role") === "Nurse" && <NurseNave history={this.props.history} />
                    }
                </div>
                <div className="mt-4">
                    <Link to="/addStaff" style={{ textDecoration: "none" }}><button className="btn text-white btn-dark" name="addStaff">
                        Add Staff
                    </button></Link>
                </div>
                <table className="table table-bordered table-striped container mt-5">

                    <thead>
                        <tr>
                            {this.state.StaffHead.map((head, idx) => (
                                <th key={idx}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Staff.map((dept, idx) => (
                            <tr key={idx}>
                                {this.state.StaffHead.map((head, i) => (
                                    <td key={i}>{dept[head]}</td>
                                ))}
                                <td>
                                    <button className="btn btn-warning">
                                        <Link to={`/editStaff/${dept.StaffNo}`}>Edit</Link>
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

export default staffList;
