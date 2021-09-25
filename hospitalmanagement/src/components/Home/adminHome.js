import React, { Component } from 'react';


import AdminNav from './../adminNav';
class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onclick(e) {
        console.log(e);
        if (e.target.name === "doctor") {
            this.props.history.push("/Doctor");
        }
    }
    render() {
        return (
            <div>
                <AdminNav />
            </div>
        );
    }
}

export default AdminHome;