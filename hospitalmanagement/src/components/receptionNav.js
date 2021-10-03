import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class receptionNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    logout() {
        window.sessionStorage.removeItem("usertoken"); 
        window.sessionStorage.removeItem("role");        
        window.sessionStorage.removeItem("userData");
        this.props.history.push("/receptionLogin");
    }
    render() {
        return (
            <div>
                <div className="row bg-dark">
                    <div className="col">
                        <Link to="/receptionHome" style={{ textDecoration: "none" }}><button className="btn text-white" name="Home">
                            Home
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/Doctor" style={{ textDecoration: "none" }}><button className="btn text-white" name="doctor">
                            Doctor
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/patientList" style={{ textDecoration: "none" }}><button className="btn  text-white" name="staff">
                            Patient
                        </button></Link>
                    </div>
                    <div className="col">
                        <div className="text-right">
                            <button className="btn  text-white" onClick={this.logout.bind(this)}>LogOut</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default receptionNav;