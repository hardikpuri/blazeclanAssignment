
import React, { Component } from 'react'
import background from './../../img.png';
import axios from 'axios';
import LoginNav from '../loginNav';

class DoctorLogin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: []
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        let a = [];
        if (this.state.email === "" || this.state.email === undefined) {
            a.push('InValid Userid ');
        }
        if (this.state.password === "" || this.state.password === undefined) {
            a.push('InValid UserName ');
        }
        console.log(a);
        this.setState({ errors: a });
        console.log(this.state.errors);
        const user = {
            UserName: this.state.email,
            Password: this.state.password
        }

        axios.post('http://localhost:9081/doctorLogin', {
            UserName: user.UserName,
            Password: user.Password
        }).then(response => {
            if (response.data === "Email not found") return "Email not found";
            sessionStorage.setItem('usertoken', response.data.token);
            sessionStorage.setItem('staffno', response.data.row);
            return response.data
        }).then(res => {
            if (res !== "Email not found") {
                sessionStorage.setItem('userData', JSON.stringify(user));
                sessionStorage.setItem('role', "Doctor");
                console.log(res);
                this.props.history.push('/doctorHome');
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="body" style={{background: `url(${background}) no-repeat`, backgroundSize: 'cover'}}>
                <div className="container my-5">
                    <div className="row">
                    <LoginNav />
                        <div className="col-md-4 mt-5 mx-auto">
                        <h3>DoctorLogin</h3>
                            <form noValidate onSubmit={this.onSubmit} >
                                <h1 className="h3 mb-3 mt-5 font-weight-normal btn-rg">Please sign in as Doctor</h1>
                                <div className="form-group btn-rg">
                                    <label htmlFor="email" >User Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        placeholder="UserName"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group btn-rg">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block mt-5"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                        <div className="col-8">

                        </div>
                    </div>
                </div>

                <div className="text-danger">
                <ul>
                        {
                            this.state.errors.map((emp, idx) => (
                                <li key={idx}>
                                    {emp}
                                </li>
                            ))}
                    </ul>
                </div>
                <br />
                <br />
                <br />
                <br />

            </div>
        )
    }
}
export default DoctorLogin;
