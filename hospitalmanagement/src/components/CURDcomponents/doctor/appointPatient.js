import React, { Component } from "react";

import axios from 'axios';
import ReceptionNav from './../../receptionNav';
import { ServiceClass } from "../../../service/service";
class appointPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            Time: 0,
            pno: 0,
            patient: "",
            DoctorId: 0,
            message: "",
            
        };
        this.service = new ServiceClass();

    }
    handleAllChanges = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        console.log(this.state.DoctorId);
        console.log(this.state.pno);
    };
    clear = () => {
        this.setState({ DeptNo: 0 });
        this.setState({ DeptName: "" });
        this.setState({ Location: "" });
        this.setState({ Capacity: 0 });
    };
    save = () => {
        let token = window.sessionStorage.getItem("usertoken");
        
        let appoint = {
            Time: this.state.Time,
            Patient: this.state.patient,
            DoctorId: this.state.DoctorId,
            phone: this.state.pno
        };
        axios.put(`http://localhost:9081/appoint`, appoint, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({ message: `Data Updated Successfully` });
            console.log(this.state.message);
            this.props.history.push("/receptionHome");
        }).catch(err => {
            console.log(err)
        })


    };
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        this.service.
        getDoctorData(token).then(response => {
            console.log(response.data.message);
            this.setState({ data: response.data.message });
            //this.props.history.push("/staff");
        }).catch(err => {
            console.log(err)
        })
    };

    render() {
        return (
            <div>
                <div className="container-fluid">
                    {
                        window.sessionStorage.getItem("role") === "Reception" && <ReceptionNav history={this.props.history} />
                    }
                </div>
                <h4>Appointment</h4>
                <form className="container">
                    <div className="form-group">
                        <label htmlFor="StaffNo">Name</label>
                        <select name="DoctorId" onChange={this.handleAllChanges.bind(this)}>
                            {
                                <option>--Select--</option>
                            }
                            {
                                this.state.data.map((head, idx) => (
                                    <option key={idx} value={head.DoctorId}>{head.FirstName}{head.LastName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Specialization">Time</label>
                        <input
                            type={"time"}
                            name="Time"
                            className="form-control"
                            value={this.state.Time}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Experience">Patient Name</label>
                        <input
                            type="text"
                            name="patient"
                            className="form-control"
                            value={this.state.patient}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Experience">Phone Number</label>
                        <input
                            type="number"
                            name="pno"
                            className="form-control"
                            value={this.state.pno}
                            onChange={this.handleAllChanges.bind(this)}
                        />
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

export default appointPatient;
