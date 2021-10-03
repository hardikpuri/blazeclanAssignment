import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class adminNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    logout() {
        window.sessionStorage.removeItem("usertoken");
        window.sessionStorage.removeItem("role");
        window.sessionStorage.removeItem("userData");
        this.props.history.push("/adminLogin");
    }
    render() {
        return (
            <div>
                <div className="row bg-dark">
                    <div className="col">
                        <Link to="/adminHome" style={{ textDecoration: "none" }}><button className="btn text-white" name="Home">
                            Home
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/userlist" style={{ textDecoration: "none" }}><button className="btn text-white" name="userlink">
                            Users
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/Doctor" style={{ textDecoration: "none" }}><button className="btn text-white" name="doctor">
                            Doctor
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/patientlist" style={{ textDecoration: "none" }}><button className="btn text-white" name="patient">
                            Patient
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/staff" style={{ textDecoration: "none" }}><button className="btn  text-white" name="staff">
                            Staff
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/nurseList" style={{ textDecoration: "none" }}><button className="btn  text-white" name="nurseList">
                            Nurse
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/ward" style={{ textDecoration: "none" }}><button className="btn text-white" name="ward">
                            Ward
                        </button></Link>
                    </div>
                    <div className="col">
                        <div className="text-right">
                            <button className="btn  text-white" onClick={this.logout.bind(this)}>
                                LogOut</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default adminNav;