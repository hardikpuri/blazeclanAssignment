import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ServiceClass } from '../../service/service';
import ReceptionNav from './../receptionNav';


class receptionHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PatientCount: 0,
            Name: "",
            LName: "",
            Did: 0,
            ward: "",
            wardcount: 0
        }
        this.service = new ServiceClass();
    }

    logout() {
        window.sessionStorage.removeItem("usertoken");
        window.sessionStorage.removeItem("role");
        this.props.history.push("/adminLogin");
        window.sessionStorage.removeItem("userData");
    }
    componentDidMount() {
        let staffno = window.sessionStorage.getItem("staffno");
        let token = window.sessionStorage.getItem("usertoken");
        this.service.
            getPatientData(token)
            .then((resp) => {
                this.setState({ PatientCount: resp.data.message.length })
            })
        this.service.
            getDoctorData(token)
            .then((resp) => {
                this.setState({ DoctorCount: resp.data.message.length })
            });

    }
    render() {
        return (
            <div className="container-fluid">
                <ReceptionNav history={this.props.history} />

                <h1>
                    <strong>{this.state.Name} {this.state.LName}</strong>
                </h1>
                <div className="row mt-5 container">
                    <div class="col card m-3 bg-dark bg-opacity-60 bg-gradient">
                        <Link to="/Doctor" style={{ textDecoration: "none" }} className="text-light">
                            <div class="card-header">Doctor</div>
                            <div class="card-body">
                                <h3 class="card-title">{this.state.DoctorCount}</h3>
                                Total Active Doctors
                            </div>
                        </Link>
                    </div>
                    <div class="col card m-3 bg-light bg-gradient">
                        <div class="card-header">Patient</div>
                        <div class="card-body">
                            <small>Patients:</small>
                            <h3 class="card-title">{this.state.PatientCount}</h3>
                            <Link to="/patientlist"><button className="btn btn-dark m-2">
                                See All
                            </button></Link>
                            <Link to="/addPatient" style={{ textDecoration: "none" }}><button className="btn text-white btn-dark" name="addPatient">
                                Add Patient
                            </button></Link>
                            <small></small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default receptionHome;