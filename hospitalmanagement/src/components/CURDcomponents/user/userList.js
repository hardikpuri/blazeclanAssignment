import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './../../adminNav';


class userList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            message: '',
            columnHeaders: []
        };

    }

    loadData(token) {
        axios.get('http://localhost:9081/user/get', {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data.message);
            this.setState({ user: response.data.message }, () => {
                this.setState({ message: `Data Received Successfully` });
                this.setState(
                    { columnHeaders: Object.keys(this.state.user[0]) },
                    () => {
                        console.log(`Columns ${this.state.columnHeaders}`);
                    }
                );
                console.log(this.state.user);
            });
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        this.loadData(token);
    };
    render() {
        return (
            <div>
                <div className="container-fluid">
                {
                    window.sessionStorage.getItem("role") === "Admin" && <AdminNav history={this.props.history} /> 
                }
                </div>
                <div className="mt-4">
                    <Link to="/registeruser" style={{ textDecoration: "none" }}><button className="btn text-white btn-dark" name="adduser">
                        Add User
                    </button></Link>
                </div>
                <table className="table table-bordered table-striped container mt-5">
                    <thead>
                        <tr>
                            {this.state.columnHeaders.map((head, idx) => (
                                <th key={idx}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.user.map((dept, idx) => (
                            <tr key={idx}>
                                {this.state.columnHeaders.map((head, i) => (
                                    <td key={i}>{dept[head]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default userList;
