import React, { Component } from "react";
import { Link } from 'react-router-dom';
import MedicalNav from "../../medicalnav";
import { ServiceClass } from "../../../service/service";
class medicineList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Medicine: [],
            Header: [],
            message: '',
        };
        this.service = new ServiceClass();
    }

    loadData(token) {
        this.service.
        getMedicineData(token).then(response => {
                console.log(response.data.message);
                this.setState({ Medicine: response.data.message }, () => {
                    this.setState({ message: `Data Received Successfully` });
                    this.setState(
                        { Header: Object.keys(this.state.Medicine[0]) },
                        () => {
                            console.log(`Columns ${this.state.Header}`);
                        }
                    );
                    console.log(this.state.Medicine);
                });
            }).catch(err => {
                console.log(err)
            })
    }
    componentDidMount = () => {
        let token = window.sessionStorage.getItem("usertoken");
        this.loadData(token);
    };
    home() {
        this.props.history.push("/adminHome");
    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    {
                        window.sessionStorage.getItem("role") === "Medical" && <MedicalNav history={this.props.history} />
                    }
                </div>
                <div className="mt-4">
                    <Link to="/addMedicine" style={{ textDecoration: "none" }}><button className="btn text-white btn-dark" name="addMedicine">
                        Add Medicine
                    </button></Link>
                </div>
                <table className="table table-bordered table-striped container mt-5">

                    <thead>
                        <tr>
                            {this.state.Header.map((head, idx) => (
                                <th key={idx}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Medicine.map((dept, idx) => (
                            <tr key={idx}>
                                {this.state.Header.map((head, i) => (
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

export default medicineList;
