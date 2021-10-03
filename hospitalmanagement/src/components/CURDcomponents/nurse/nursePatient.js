import React, { Component } from "react";
import { Link } from 'react-router-dom';
import NurseNav from './../../nurseNav';
import { ServiceClass } from "../../../service/service";
class nursePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Patient: [],
            Header: [],
            message: '',
        };
        this.service = new ServiceClass();
    }

    loadData(token) {
        let staffno = window.sessionStorage.getItem("staffno");
        this.service.
            getWardPatient(token,staffno).then(response => {
                console.log(response.data.message);
                this.setState({ Patient: response.data.message }, () => {
                    this.setState({ message: `Data Received Successfully` });
                    this.setState(
                        { Header: Object.keys(this.state.Patient[0]) },
                        () => {
                            console.log(`Columns ${this.state.Header}`);
                        }
                    );
                    console.log(this.state.Patient);
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
                        window.sessionStorage.getItem("role") === "Nurse" && <NurseNav history={this.props.history} />
                    }
                </div>
                <div className="mt-4">
                    <Link to="/addPatient" style={{ textDecoration: "none" }}><button className="btn text-white btn-dark" name="addPatient">
                        Add Patient
                    </button></Link>
                </div>
                <table className="table table-bordered table-striped container mt-5">

                    <thead>
                        <tr>
                            {this.state.Header.map((head, idx) => (
                                <th key={idx}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Patient.map((dept, idx) => (
                            <tr key={idx}>
                                {this.state.Header.map((head, i) => (
                                    <td key={i}>{dept[head]}</td>
                                ))}
                                <td>
                                    <button className="btn btn-warning">
                                        <Link to={`/editSta/${dept.StaffNo}`}>Edit</Link>
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

export default nursePatient;
