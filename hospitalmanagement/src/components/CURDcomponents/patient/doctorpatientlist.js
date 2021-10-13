import React, { Component } from "react";
import { Link } from 'react-router-dom';
import DoctorNav from '../../doctorNav';
import { ServiceClass } from "../../../service/service";
class doctorPatientList extends Component {
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
            getPatientByStaff(token, staffno).then(response => {
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
    discharge(evt) {
        let token = window.sessionStorage.getItem("usertoken");
        this.service.
            dischargePatient(token, evt.target.id)
            .then(response => {
                console.log(response);
                document.location.reload();
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    {
                        window.sessionStorage.getItem("role") === "Doctor" && <DoctorNav history={this.props.history} />
                    }
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
                                {
                                    window.sessionStorage.getItem("role") == "Doctor" &&
                                    <td id={dept.PatientId} onClick={this.discharge.bind(this)}>
                                        <img src="https://img.icons8.com/ios/50/000000/out-patient-department.png" id={dept.PatientId}/>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default doctorPatientList;
