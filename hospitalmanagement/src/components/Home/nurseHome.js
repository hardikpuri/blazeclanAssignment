import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ServiceClass } from '../../service/service';
import NurseNav from './../nurseNav';


class NurseHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PatientCount: 0,
            Name: "",
            LName: "",
            Did: 0,
            ward: "",
            wardcount:0
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
            getStaffById(token, staffno)
            .then((resp) => {
                this.setState({ Name: resp.data.message.FirstName });
                this.setState({ LName: resp.data.message.LastName });
                console.log(resp.data.message.FirstName);
            });
        this.service.
            getWardForNurse(token, staffno)
            .then((resp) => {
                console.log(resp.data.message[0].WardName);
                this.setState({ ward: resp.data.message[0].WardName });
            });
        this.service.
            getWardPatient(token, staffno)
            .then((resp) => {
                this.setState({ wardcount: resp.data.message.length });
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <NurseNav history={this.props.history} />

                <h1>
                    <strong>{this.state.Name} {this.state.LName}</strong>
                </h1>
                <div className="row mt-5 container">
                    <div class="col card m-3 bg-dark text-light bg-gradient">
                        <div class="card-header">ward</div>
                        <div class="card-body">
                            <h3 class="card-title">{this.state.ward}</h3>
                        </div>
                    </div>
                    <div class="col card m-3 bg-light bg-gradient">
                        <div class="card-header">Patient</div>
                        <div class="card-body">
                        <small>Patient In your ward:</small>
                            <h3 class="card-title">{this.state.wardcount}</h3>
                            
                            <Link to ="/nursepatient"><button className="btn btn-dark">
                                See All
                                </button></Link>
                            <small></small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NurseHome;