import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ServiceClass } from '../../service/service';
import DoctorNav from './../doctorNav';


class DoctorHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PatientCount: 0,
            Name: "",
            LName: "",
            Did: 0,
            data: [],
            Header: []
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
            getPatientByStaff(token, staffno)
            .then((resp) => {
                this.setState({ PatientCount: resp.data.message.length });
            });
        this.service.
            getAppointment(token, staffno)
            .then((resp) => {
                this.setState({ data: resp.data.message });
                this.setState(
                    { Header: Object.keys(this.state.data[0]) },
                    () => {
                        console.log(`Columns ${this.state.Header}`);
                    }
                );
                console.log(resp);
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <DoctorNav history={this.props.history} />

                <h1>
                    <strong>{this.state.Name} {this.state.LName}</strong>
                </h1>
                <div className="row container mx-auto">
                    <div class="col card m-3 bg-dark text-light bg-gradient">
                        <div class="card-header">Doctor</div>
                        <div class="card-body">
                            <h3 class="card-title">{this.state.PatientCount}</h3>
                            Total Active Patient under you
                            <p>
                                <Link to="/doctorpatientlist"><button className="btn btn-dark">
                                    See All
                                </button></Link>
                            </p>
                        </div>
                    </div>
                    <div class="col card m-3 bg-light bg-gradient">
                        <div class="card-header">Appointments</div>
                        <div class="card-body">
                            <h3 class="card-title"></h3>
                            <table className="table table-bordered table-striped container">

                                <thead>
                                    <tr>
                                        {this.state.Header.map((head, idx) => (
                                            <th key={idx}>{head}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((dept, idx) => (
                                        <tr key={idx}>
                                            {this.state.Header.map((head, i) => (
                                                <td key={i}>{dept[head]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DoctorHome;