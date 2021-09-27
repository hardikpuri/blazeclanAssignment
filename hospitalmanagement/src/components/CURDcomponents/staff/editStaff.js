import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './../../adminNav';
import DoctorNav from './../../doctorNav';
class EditStaffComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StaffNo: 0,
            FirstName: "",
            LastName: "",
            DOB: 0,
            adhar: 0,
            emailid: "",
            Designation: "",
            message: "",
        };

    }

    componentDidMount = () => {
        // read the Route Parameter
        let token = window.sessionStorage.getItem("usertoken");
        let staffno = this.props.match.params.id;
        axios.get(`http://localhost:9081/staff/getbyid/${staffno}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        }).then(response => {
            let staff = response.data.message;
            this.setState({ StaffNo: staff.StaffNo });
            this.setState({ FirstName: staff.FirstName });
            this.setState({ LastName: staff.LastName });
            this.setState({ DOB: staff.DOB });
            this.setState({ adhar: staff.adhar });
            this.setState({ emailid: staff.emailid });
            this.setState({ Designation: staff.Designation });
        }).catch(err => {
            console.log(err)
        })

    }

    handleAllChanges = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };
    clear = () => {
        this.setState({ DeptNo: 0 });
        this.setState({ DeptName: "" });
        this.setState({ Location: "" });
        this.setState({ Capacity: 0 });
    };
    save = () => {
        let token = window.sessionStorage.getItem("usertoken");
        let staff = {
            StaffNo: this.state.StaffNo,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            adhar: this.state.adhar,
            emailid: this.state.emailid,
            Designation: this.state.Designation
        };
        axios.post(`http://localhost:9081/staff/update`, staff, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({ message: `Data Updated Successfully` });
            console.log(this.state.message);
            this.props.history.push("/staff");
        }).catch(err => {
            console.log(err)
        })


    };

    render() {
        return (
            <div>
                <div className="container-fluid">
                {
                    window.sessionStorage.getItem("role") === "Admin" && <AdminNav />
                    
                }
                {
                    window.sessionStorage.getItem("role") === "Doctor" && <DoctorNav history={this.props.history} />
                }
                </div>
                <h4>Edit Department</h4>
                <form className="container">
                    <div className="form-group">
                        <label htmlFor="StaffNo">StaffNo</label>
                        <input
                            type={Number}
                            name="StaffNo"
                            className="form-control"
                            value={this.state.StaffNo}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="FirstName">FirstName</label>
                        <input
                            type="text"
                            name="FirstName"
                            className="form-control"
                            value={this.state.FirstName}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="LastName">LastName</label>
                        <input
                            type="text"
                            name="LastName"
                            className="form-control"
                            value={this.state.LastName}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="DOB">DOB</label>
                        <input
                            type="text"
                            name="DOB"
                            className="form-control"
                            value={this.state.DOB}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                        <div className="form-group">
                            <label htmlFor="adhar">adhar</label>
                            <input
                                type="text"
                                name="adhar"
                                className="form-control"
                                value={this.state.adhar}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailid">emailid</label>
                            <input
                                type="text"
                                name="emailid"
                                className="form-control"
                                value={this.state.emailid}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Designation">Designation</label>
                            <input
                                type="text"
                                name="Designation"
                                className="form-control"
                                value={this.state.Designation}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
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

export default EditStaffComponent;
