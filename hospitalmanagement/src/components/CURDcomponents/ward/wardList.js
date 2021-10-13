import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from './../../adminNav';
import { ServiceClass } from "../../../service/service";
class wardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ward: [],
            wardHead: [],
            message: '',
        };
        this.service = new ServiceClass();
    }

    loadData(token) {
        this.service.
            getWardData(token).then(response => {
            console.log(response.data.message);
            this.setState({ ward: response.data.message }, () => {
                this.setState({ message: `Data Received Successfully` });
                this.setState(
                    { wardHead: Object.keys(this.state.ward[0]) },
                    () => {
                        console.log(`Columns ${this.state.wardHead}`);
                    }
                );
                console.log(this.state.ward);
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
                </div>
                <table className="table table-bordered table-striped container mt-5">

                    <thead>
                        <tr>
                            {this.state.wardHead.map((head, idx) => (
                                <th key={idx}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ward.map((dept, idx) => (
                            <tr key={idx}>
                                {this.state.wardHead.map((head, i) => (
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

export default wardList;
