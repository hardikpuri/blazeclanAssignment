import React, { Component } from "react";

import axios from 'axios';
import AdminNav from './../../adminNav';
class addDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            Specialization: "",
            Experience: 0,
            StaffNo: 0,
            message: "",
            
        };

    }
    handleAllChanges = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        console.log(this.state.StaffNo);
    };
    clear = () => {
        this.setState({ DeptNo: 0 });
        this.setState({ DeptName: "" });
        this.setState({ Location: "" });
        this.setState({ Capacity: 0 });
    };
    save = () => {
        let token = window.sessionStorage.getItem("usertoken");
        let doctor = {
            Specialization: this.state.Specialization,
            Experience: this.state.Experience,
            StaffNo: this.state.StaffNo
        };
        axios.put(`http://localhost:9081/doctor/add`, doctor, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({ message: `Data Updated Successfully` });
            console.log(this.state.message);
            this.props.history.push("/Doctor");
        }).catch(err => {
            console.log(err)
        })


    };
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        axios.get(`http://localhost:9081/doctor/instaff`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
            }
        }).then(response => {
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
                        window.sessionStorage.getItem("role") === "Admin" && <AdminNav history={this.props.history} />
                    }
                </div>
                <h4>ADD Doctor</h4>
                <form className="container">
                    <div className="form-group">
                        <label htmlFor="StaffNo">Name</label>
                        <select name="StaffNo" onChange={this.handleAllChanges.bind(this)}>
                            {
                                <option>--Select--</option>
                            }
                            {
                                this.state.data.map((head, idx) => (
                                    <option key={idx} value={head.StaffNo}>{head.FirstName}{head.LastName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Specialization">Specialization</label>
                        <input
                            type={Number}
                            name="Specialization"
                            className="form-control"
                            value={this.state.Specialization}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Experience">Experience</label>
                        <input
                            type="number"
                            name="Experience"
                            className="form-control"
                            value={this.state.Experience}
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

export default addDoctor;
