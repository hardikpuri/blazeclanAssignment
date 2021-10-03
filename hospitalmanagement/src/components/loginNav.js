import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class loginNav extends Component {
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
                        <Link to="/adminLogin" style={{ textDecoration: "none" }}><button className="btn text-white" name="Home">
                            Admin
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/doctorLogin" style={{ textDecoration: "none" }}><button className="btn text-white" name="userlink">
                            Doctor
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/nurseLogin" style={{ textDecoration: "none" }}><button className="btn text-white" name="doctor">
                            Nurse
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/receptionLogin" style={{ textDecoration: "none" }}><button className="btn text-white" name="doctor">
                            Reception
                        </button></Link>
                    </div>
                </div>
            </div>

        );
    }
}

export default loginNav;