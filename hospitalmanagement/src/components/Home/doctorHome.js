import React, { Component } from 'react';
import DoctorNav from './../doctorNav';
import { Link } from 'react-router-dom';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    logout() {
        window.sessionStorage.removeItem("usertoken");
        this.props.history.push("/adminLogin");
        window.sessionStorage.removeItem("userData");
    }
    render() {
        return (
            <div className="container-fluid">
                <DoctorNav history={this.props.history} />
            </div>
        );
    }
}

export default AdminHome;