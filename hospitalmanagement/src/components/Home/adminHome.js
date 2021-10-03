import React, { Component } from 'react';
import AdminNav from './../adminNav';
import { Link } from 'react-router-dom';
import { ServiceClass } from '../../service/service';
import './../../'
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DoctorCount: 0,
            StaffCount: 0,
            WardCount: 0,
            PatientCount: 0,
            NurseCount: 0
        }
        this.service = new ServiceClass();
    }
    componentDidMount() {
        let token = window.sessionStorage.getItem("usertoken");
        this.service.
            getDoctorData(token)
            .then((resp) => {
                this.setState({ DoctorCount: resp.data.message.length })
            });
        this.service.
            getStaffData(token)
            .then((resp) => {
                this.setState({ StaffCount: resp.data.message.length })
            })
        this.service.
            getWardData(token)
            .then((resp) => {
                this.setState({ WardCount: resp.data.message.length })
            })

        this.service.
            getPatientData(token)
            .then((resp) => {
                this.setState({ PatientCount: resp.data.message.length })
            })
        this.service.
            getNurseData(token)
            .then((resp) => {
                this.setState({ NurseCount: resp.data.message.length })
            })

    }
    render() {
        return (
            <div>
                {
                    window.sessionStorage.getItem("role") === "Admin" && 
                    <div className="container-fluid">
                        <AdminNav history={this.props.history} />
                        <h1>
                            ADMIN Home Page
                        </h1>
                        <div className="container">
                            <div className="row mt-5">
                                <div class="col card m-3 bg-dark bg-opacity-60 bg-gradient">
                                <Link to ="/Doctor" style={{ textDecoration: "none" }} className="text-light">
                                    <div class="card-header">Doctor</div>
                                    <div class="card-body">
                                        <h3 class="card-title">{this.state.DoctorCount}</h3>
                                        Total Active Doctors
                                    </div>
                                    </Link>
                                </div>
                               
                                <div class="col card text-white m-3 bg-dark bg-gradient">
                                    <div class="card-header">Staff</div>
                                    <div class="card-body">
                                        <h3 class="card-title">{this.state.StaffCount}</h3>
                                        Total Staff
                                    </div>
                                </div>
                                <div class="col card text-white m-3 bg-dark bg-gradient">
                                    <div class="card-header">Ward</div>
                                    <div class="card-body">
                                        <h3 class="card-title">{this.state.WardCount}</h3>
                                        Total Ward
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div class="col card m-3 bg-dark text-light bg-gradient">
                                    <div class="card-header">Patient</div>
                                    <div class="card-body">
                                        <h3 class="card-title">{this.state.PatientCount}</h3>
                                        Total Patient
                                    </div>
                                </div>
                                <div class="col card text-white m-3 bg-dark bg-gradient">
                                    <div class="card-header">Nurse</div>
                                    <div class="card-body">
                                        <h3 class="card-title">{this.state.NurseCount}</h3>
                                        Total Nurse
                                    </div>
                                </div>
                                <div class="col card text-white m-3 bg-dark bg-gradient">
                                    <div class="card-header">Ward</div>
                                    <div class="card-body">
                                        <h5 class="card-title">{this.state.WardCount}</h5>
                                        Total Ward
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default AdminHome;