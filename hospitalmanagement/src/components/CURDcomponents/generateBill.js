import React, { Component } from "react";
import axios from 'axios';
import { ServiceClass } from "../../service/service";
import ReceptionNav from './../../components/receptionNav';
import { Link } from "react-router-dom";

class generateBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Charges: [],
            Patient: [],
            Header: [],
            wardcharge: 0,
            message: '',
            total: 0,
            Days: 1
        };
        this.service = new ServiceClass();
    }
    wardcharge(ward, token) {
        this.service.
            wardCharge(token, ward.WardNo).then(response => {
                console.log(response.data.message);
                this.setState({ wardcharge: response.data.message.Charges });
                this.setState({ total: this.state.total + response.data.message.Charges });
            }).catch(err => {
                console.log(err)
            });
        this.service.
            doctorCharge(token, ward.DoctorId).then(response => {
                console.log(response.data.message);
                this.setState({ doctorcharge: response.data.message.Charges });
                this.setState({ total: this.state.total + response.data.message.Charges });
            }).catch(err => {
                console.log(err)
            })
    }

    loadData(token, id) {

        axios.get(`http://localhost:9081/discharge/getbyid/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        }).then(response => {
            this.setState({ Patient: response.data.message });
            let ad = response.data.message.AdmissionDate.split("-");
            let today = new Date().toISOString().slice(0, 10).split("-");
            if(ad[1]===today[1]){
                this.setState({Days: today[2]-ad[0]});
            }
            this.wardcharge(response.data.message, token);
        }).catch(err => {
            console.log(err)
        })

        this.service.
            getCharges(token).then(response => {
                console.log(response.data.message);
                this.setState({ Charges: response.data.message }, () => {
                    this.setState({ message: `Data Received Successfully` });
                    this.setState(
                        { Header: Object.keys(this.state.Charges[0]) },
                        () => {
                            console.log(`Columns ${this.state.Header}`);
                        }
                    );
                    let t = 0;
                    this.state.Charges.map(dept => (
                        t = t + dept.charges
                    ));
                    console.log(t);
                    this.setState({ total: t });
                    console.log(this.state.Patient);
                });
            }).catch(err => {
                console.log(err)
            })
    }
    clsbill = () => {
        let token = window.sessionStorage.getItem("usertoken");
        this.service.
            clearBill(token, this.state.Patient.PatientId).then(response => {
                console.log(response.data.message);
                this.props.history.push("/dischargeList");
            }).catch(err => {
                console.log(err)
            })
    }
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        let id = this.props.match.params.id;
        this.loadData(token, id);
    };
    render() {
        return (
            <div>
                <div className="container-fluid">
                    {
                        window.sessionStorage.getItem("role") === "Reception" && <ReceptionNav history={this.props.history} />
                    }
                </div>
                <div className="m-5 container border bg-light">
                    <strong>Bill</strong>
                    <div className="row">
                        <div className="p-3 m-3 border col-md-5">
                            <h4>TO:</h4>
                            <p>
                                Patient Name: {this.state.Patient.PatientName}<br />
                                Email : {this.state.Patient.email}<br />
                                Age : {this.state.Patient.Age}<br />
                                Disease: {this.state.Patient.Disease}<br />
                                Days Admitted: {this.state.Days}
                            </p>
                        </div>
                        <div className="col"></div>
                        <div className="m-3 p-3 border col-md-5">
                            <h4>Pay TO:</h4>
                            <p>
                                Bank: SBI <br />
                                Acount No: 1233456889<br />
                                Holder : Hospital
                            </p>
                        </div>
                    </div>
                    <table className="table table-bordered container mt-5 w-50">
                        <thead>
                            <tr>
                                {this.state.Header.map((head, idx) => (
                                    <th key={idx}>{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Charges.map((dept, idx) => (
                                <tr key={idx}>
                                    {this.state.Header.map((head, i) => (
                                        <td key={i}>{dept[head]}</td>
                                    ))}
                                </tr>
                            ))}
                            {
                                <tr>
                                    <td>Ward Charges:</td>
                                    <td>{this.state.wardcharge}</td>
                                </tr>
                            }
                            {
                                <tr>
                                    <td>Doctor Charges:</td>
                                    <td>{this.state.doctorcharge}</td>
                                </tr>
                            }
                            {
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                            }
                            {
                                <tr>
                                    <td><strong>Total:</strong></td>
                                    <td><strong>{this.state.total}</strong></td>
                                </tr>
                            }
                            {
                                <tr>
                                    <td>No of days Admitted:</td>
                                    <td>{this.state.Days}</td>
                                </tr>
                            }
                            {
                                <tr>
                                    <td><strong>Amount To be Paid:</strong></td>
                                    <td><strong>{this.state.total * this.state.Days}</strong></td>
                                </tr>
                            }
                        </tbody>
                    </table><br />
                    <Link to="/dischargeList">
                        <button className="btn btn-dark">Back</button>
                    </Link>
                    <button className="btn btn-success m-5" onClick={this.clsbill.bind(this)}>Clear Bill</button>
                    <button className="btn btn-success m-5" onClick={window.print}>Print</button>
                </div>
            </div>
        );
    }
}

export default generateBill;
