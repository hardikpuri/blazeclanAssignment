import React, { Component } from "react";

import axios from 'axios';
import AdminNav from './../../adminNav';
import { ServiceClass } from "../../../service/service";
class addNurse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            WardId:0,
            StaffNo: 0,
            message: "",
            ward:[]
        };
        this.service = new ServiceClass();

    }
    handleAllChanges = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
        console.log(this.state.WardId)
    };
    clear = () => {
        this.setState({ DeptNo: 0 });
        this.setState({ DeptName: "" });
        this.setState({ Location: "" });
        this.setState({ Capacity: 0 });
    };
    save = () => {
        let token = window.sessionStorage.getItem("usertoken");
        let nurse = {
            StaffNo: this.state.StaffNo,
            WardNo: this.state.WardId
        };
        axios.put(`http://localhost:9081/nurse/add`, nurse, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({ message: `Data Updated Successfully` });
            console.log(this.state.message);
            this.props.history.push("/nurseList");
        }).catch(err => {
            console.log(err)
        })


    };
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        axios.get(`http://localhost:9081/nurse/instaff`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response.data.message);
            this.setState({ data: response.data.message });
        }).catch(err => {
            console.log(err)
        })
        this.service.
        getWardData(token).then(response => {
            console.log(response.data.message);
            this.setState({ward: response.data.message});
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
                <h4>ADD Nurse</h4>
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
                        <label htmlFor="WardId">Ward</label>
                        <select name="WardId" onChange={this.handleAllChanges.bind(this)}>
                            {
                                <option>--Select--</option>
                            }
                            {
                                this.state.ward.map((head, idx) => (
                                    <option key={idx} value={head.WardId}>{head.WardName}</option>
                                ))
                            }
                        </select>
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

export default addNurse;
