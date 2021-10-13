import React, { Component } from "react";

import axios from 'axios';
import MedicalNav from './../../medicalnav';
class addStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            medicineName: "",
            medicineType: "",
            manufacturerName: "",
            unitPrice: 0,
            quantity: 0,
            manufactureDate: "",
            expiryDate: "",
            hospitalInwardDate: "",
            error: []
        };

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
        let a = [];
        if (this.state.FirstName == "") {
            a.push("NULL FirstName");
        }
        this.setState({ error: a });
        if (a.length === 0) {
            let token = window.sessionStorage.getItem("usertoken");
            let medicine = {
                medicineName: this.state.medicineName,
                medicineType: this.state.medicineType,
                manufacturerName: this.state.manufacturerName,
                unitPrice: this.state.unitPrice,
                quantity: this.state.quantity,
                manufactureDate: this.state.manufactureDate,
                expiryDate: this.state.expiryDate,
                hospitalInwardDate: this.state.hospitalInwardDate
            };
            axios.put(`http://localhost:9081/medicine/add`, medicine, {
                headers: {
                    'AUTHORIZATION': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                this.setState({ message: `Data Updated Successfully` });
                console.log(this.state.message);
                this.props.history.push("/medicineList");
            }).catch(err => {
                console.log(err)
            })


        }
    };

    render() {
        return (
            <div>
                <div className="container-fluid">
                    {
                        window.sessionStorage.getItem("role") === "Medical" && <MedicalNav history={this.props.history} />
                    }
                </div>
                <h4>ADD Medicine</h4>
                <form className="container w-50">
                    <div className="form-group">
                        <label htmlFor="FirstName">Medicine Name</label>
                        <input
                            type="text"
                            name="medicineName"
                            className="form-control"
                            value={this.state.medicineName}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="LastName">Medicine Type</label>
                        <input
                            type="text"
                            name="medicineType"
                            className="form-control"
                            value={this.state.medicineType}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="DOB">Manufacturer Name</label>
                        <input
                            type="text"
                            name="manufacturerName"
                            className="form-control"
                            value={this.state.manufacturerName}
                            onChange={this.handleAllChanges.bind(this)}
                        />
                        <div className="form-group">
                            <label htmlFor="adhar">Unit Price</label>
                            <input
                                type="number"
                                name="unitPrice"
                                className="form-control"
                                value={this.state.unitPrice}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailid">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                className="form-control"
                                value={this.state.quantity}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Designation">Manufacture Date</label>
                            <input
                                type="text"
                                name="manufactureDate"
                                className="form-control"
                                value={this.state.manufactureDate}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Designation">Expiry Date</label>
                            <input
                                type="text"
                                name="expiryDate"
                                className="form-control"
                                value={this.state.expiryDate}
                                onChange={this.handleAllChanges.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Designation">In stock Date</label>
                            <input
                                type="text"
                                name="hospitalInwardDate"
                                className="form-control"
                                value={this.state.hospitalInwardDate}
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
                <div className="container text-danger">
                    <strong>
                        {this.state.error}
                    </strong>
                </div>
            </div>
        );
    }
}

export default addStaff;
