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
        this.current = this.current.bind(this);
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
                this.pagination();
                this.printt(1);
            }).catch(err => {
                console.log(err)
            })
    }
    pagination() {
        let x = this.state.Staff.length / 5;
        let li = "";
        for (var i = 0; i < x; i++) {
            li += `<li id="${i + 1}" class="page-link" onClick=${this.current.bind(this)}>${i + 1}</li>`;
            console.log(li);
        }
        document.getElementById("page").innerHTML = li;
    }
    current(evt){
        console.log(evt.target.id);
        this.printt(2);
    }
    printt(id) {
        console.log(id);
        id = id*5;
        let tr = "";
        let arr = this.state.Staff;
        let headers = this.state.StaffHead;
        for (var i = id - 5; i < id; i++) {
            if (arr[i] != null) {
                tr += `<tr>`;
                for (var j = 0; j < headers.length; j++) {
                    tr += `<td> ${arr[i][headers[j]]}</td>`;
                }
                tr += `</tr>`;
            }
        }
        document.getElementById("tbody").innerHTML = tr;
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
                        window.sessionStorage.getItem("role") === "Nurse" && <NurseNave history={this.props.history} />
                    }
                </div>
                <div className="mt-4">
                    {
                        window.sessionStorage.getItem("role") === "Admin" &&
                        <Link to="/addStaff" style={{ textDecoration: "none" }}><button className="btn text-white btn-dark" name="addStaff">
                            Add Staff
                        </button></Link>
                    }
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
                                {
                                    window.sessionStorage.getItem("role") == "Admin" &&
                                    <td>
                                        <button className="btn btn-warning">
                                            <Link to={`/editStaff/${dept.StaffNo}`}>Edit</Link>
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table table-striped">
                    <tbody id="tbody">

                    </tbody>
                </table>
                <ul class="pagination justify-content-center" id="page">
                    
                </ul>
            </div>
        );
    }
}

export default staffList;
