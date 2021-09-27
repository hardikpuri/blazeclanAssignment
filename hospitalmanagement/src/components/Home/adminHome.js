import React, { Component } from 'react';
import AdminNav from './../adminNav';
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
                <AdminNav />
            </div>
        );
    }
}

export default AdminHome;