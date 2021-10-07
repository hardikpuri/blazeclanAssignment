import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class medicalNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    logout() {
        window.sessionStorage.removeItem("usertoken"); 
        window.sessionStorage.removeItem("role");        
        window.sessionStorage.removeItem("userData");
        this.props.history.push("/medicalLogin");
    }
    render() {
        return (
            <div>
                <div className="row bg-dark">
                    <div className="col">
                        <Link to="/medicalHome" style={{ textDecoration: "none" }}><button className="btn text-white" name="Home">
                            Home
                        </button></Link>
                    </div>
                    <div className="col">
                        <Link to="/medicineList" style={{ textDecoration: "none" }}><button className="btn  text-white" name="medicine">
                            Medicine
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

export default medicalNav;