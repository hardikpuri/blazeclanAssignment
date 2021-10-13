import React, { Component } from "react";

import axios from 'axios';
import AdminNav from './../../adminNav';
import ReceptionNav from './../../receptionNav';
import { ServiceClass } from "../../../service/service";
import patientList from "./patientList";
class editPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Doctor: [],
            Ward: [],
            PatientId:0,
            PatientName: "",
            Age: 0,
            adhar: "",
            email: "",
            Disease: "",
            WardNo: "",
            DoctorId: 0,
            message: "",
            AdmissionDate:""
        };
        this.service = new ServiceClass();
    }
    handleAllChanges = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };
    clear = () => {
        this.setState({ DeptNo: 0 });
        this.setState({ DeptName: "" });
        this.setState({ Location: "" });
        this.setState({ Capacity: 0 });
    };
    save = () => {
        let token = window.sessionStorage.getItem("usertoken");
        let patient = {
            PatientId: this.state.PatientId,
            PatientName: this.state.PatientName,
            Age: this.state.Age,
            adhar: this.state.adhar,
            email: this.state.email,
            Disease: this.state.Disease,
            WardNo: this.state.WardNo,
            DoctorId: this.state.DoctorId,
            AdmissionDate:this.state.AdmissionDate
        };
        axios.put(`http://localhost:9081/patient/update`, patient, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({ message: `Data Updated Successfully` });
            console.log(this.state.message);
            this.props.history.push("/patientList");
        }).catch(err => {
            console.log(err)
        })
    };

    componentDidMount(){
        let token = window.sessionStorage.getItem("usertoken");
        this.service.
        getWardData(token).then(response => {
            console.log(response.data.message);
            this.setState({Ward: response.data.message});
        }).catch(err => {
            console.log(err)
        })

        this.service.
        getDoctorName(token).then(response => {
            console.log(response.data.message);
            this.setState({Doctor: response.data.message});
        }).catch(err => {
            console.log(err)
        })

        let PatientId = this.props.match.params.id;
        axios.get(`http://localhost:9081/patient/getbyid/${PatientId}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        }).then(response => {
            let Patient = response.data.message;
            this.setState({ PatientId: Patient.PatientId });
            this.setState({ PatientName: Patient.PatientName });
            this.setState({ Age: Patient.Age });
            this.setState({ adhar: Patient.adhar });
            this.setState({ email: Patient.email });
            this.setState({ adhar: Patient.adhar });
            this.setState({ Disease: Patient.Disease });
            this.setState({ WardNo: Patient.WardNo });
            this.setState({ DoctorId: Patient.DoctorId });
            this.setState({AdmissionDate: Patient.AdmissionDate});
        }).catch(err => {
            console.log(err)
        })


    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    {
                        window.sessionStorage.getItem("role") === "Admin" && <AdminNav history={this.props.history} />
                    }
                    {
                        window.sessionStorage.getItem("role") === "Reception" && <ReceptionNav history={this.props.history} />
                    }
                </div>
                <h4>EDIT patient</h4>
                <form className="container">
                    <div className="form-group">
                        <label htmlFor="PatientName">PatientName</label>
                        <input
                            type="text"
                            name="PatientName"
                            className="form-control"
                            value={this.state.PatientName}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Age">Age</label>
                        <input
                            type="number"
                            name="Age"
                            className="form-control"
                            value={this.state.Age}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adhar">adhar</label>
                        <input
                            type="text"
                            name="adhar"
                            className="form-control"
                            value={this.state.adhar}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                        <div className="form-group">
                            <label htmlFor="Disease">Disease</label>
                            <input
                                type="text"
                                name="Disease"
                                className="form-control"
                                value={this.state.Disease}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="WardNo">WardName</label>
                            <select name="WardNo" onChange={this.handleAllChanges.bind(this)}>
                                {
                                    <option>--Select--</option>
                                }
                                {
                                    this.state.Ward.map((head, idx) => (
                                        <option key={idx} value={head.WardId}>{head.WardName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="DoctorId">DoctorName</label>
                            <select name="DoctorId" onChange={this.handleAllChanges.bind(this)}>
                                {
                                    <option>--Select--</option>
                                }
                                {
                                    this.state.Doctor.map((head, idx) => (
                                        <option key={idx} value={head.DoctorId}>{head.FirstName}{head.LastName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Disease">Admission Date</label>
                            <input
                                type="text"
                                name="AdmissionDate"
                                className="form-control"
                                value={this.state.AdmissionDate}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="btn-group">
                        <input
                            type="button"
                            value="Clear"
                            className="btn btn-primary"
                            onClick={this.clear.bind(this)}
                        />
                        <input
                            type="button"
                            value="Save"
                            className="btn btn-success"
                            onClick={this.save.bind(this)}
                        />
                    </div>
                </form>
                <hr />
                <div className="container">
                    <strong>
                        {this.state.message}
                    </strong>
                </div>
            </div>
        );
    }
}

export default editPatient;
