import React, { Component } from "react";
import axios from 'axios';
import AdminNav from './../../adminNav';
class registerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            StaffNo: 0,
            username: "",
            password: "",
            role: "",
            message:""
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
    save = (e) => {
        e.preventDefault()
        let token = window.sessionStorage.getItem("usertoken");
        let doctor = {
            StaffNo: this.state.StaffNo,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        };
        axios.put(`http://localhost:9081/user/add`, doctor, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            this.setState({ message: `Data Updated Successfully` });
            console.log(this.state.message);
            this.props.history.push("/userlist");
        }).catch(err => {
            console.log(err)
        })


    };
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        axios.get(`http://localhost:9081/staff/notuser`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`,
            }
        }).then(response => {
            console.log(response.data.message);
            this.setState({ data: response.data.message });
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
                <h4>Register User</h4>
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
                        <label htmlFor="UserName">UserName</label>
                        <input
                            type={Text}
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input
                            type="text"
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group m-3">
                        <label htmlFor="Role">Role</label>
                        <select name="role" onChange={this.handleAllChanges.bind(this)}>
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                        </select>
                    </div>
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
            </div>
        );
    }
}

export default registerUser;
