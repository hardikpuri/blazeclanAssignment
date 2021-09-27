import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './../../adminNav';
import DoctorNav from './../../doctorNav';

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

    }

    loadData(token) {
        axios.get('http://localhost:9081/doctor/list', {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        }).then(response => {
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
                    window.sessionStorage.getItem("role") === "Admin" && <AdminNav /> 
                }
                {
                    window.sessionStorage.getItem("role") === "Doctor" && <DoctorNav history={this.props.history} /> 
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
