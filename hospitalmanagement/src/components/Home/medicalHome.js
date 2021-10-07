import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ServiceClass } from '../../service/service';
import MedicalNav from './../medicalnav';


class medicalHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MedicineCount: 0,
            Name: "",
            LName: "",
            Did: 0,
            ward: "",
            wardcount: 0
        }
        this.service = new ServiceClass();
    }

    logout() {
        window.sessionStorage.removeItem("usertoken");
        window.sessionStorage.removeItem("role");
        this.props.history.push("/adminLogin");
        window.sessionStorage.removeItem("userData");
    }
    componentDidMount() {
        let staffno = window.sessionStorage.getItem("staffno");
        let token = window.sessionStorage.getItem("usertoken");
        this.service.
            getMedicineData(token)
            .then((resp) => {
                this.setState({ MedicineCount: resp.data.message.length })
            })
    }
    render() {
        return (
            <div className="container-fluid">
                <MedicalNav history={this.props.history} />
                <h1>
                    <strong>{this.state.Name} {this.state.LName}</strong>
                </h1>
                <div className="row mt-5 container mx-auto">
                    <div class="col card m-3 bg-dark bg-opacity-60 bg-gradient">
                        <Link to="/medicineList" style={{ textDecoration: "none" }} className="text-light">
                            <div class="card-header">Medicine</div>
                            <div class="card-body">
                                <h3 class="card-title">{this.state.MedicineCount}</h3>
                                Total Medicine
                            </div>
                        </Link>
                    </div>
                    <div class="col card m-3 bg-light bg-opacity-60 bg-gradient">
                        <Link to="/Doctor" style={{ textDecoration: "none" }} className="text-light">
                            <div class="card-header"></div>
                            <div class="card-body">
                                <h3 class="card-title"></h3>
                                
                            </div>
                        </Link>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default medicalHome;