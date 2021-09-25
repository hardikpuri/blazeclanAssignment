
import React, { Component } from 'react'

import axios from 'axios';

class AdministratorLogin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            UserName: this.state.email,
            Password: this.state.password
        }

        axios.post('http://localhost:9081/userLogin', {
            UserName: user.UserName,
            Password: user.Password
        }).then(response => {
            if (response.data === "Email not found") return "Email not found";

            sessionStorage.setItem('usertoken', response.data.token)
            return response.data
        }).then(res => {
            if (res !== "Email not found") {
                sessionStorage.setItem('userData', JSON.stringify(user));
                console.log(res);
                this.props.history.push('/adminHome');
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="body">
                <div className="container my-5">
                    <div className="row">
                        <h1>AdminLogin</h1>
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.onSubmit} >
                                <h1 className="h3 mb-3 mt-5 font-weight-normal btn-rg">Please sign in as Admin</h1>
                                <div className="form-group btn-rg">
                                    <label htmlFor="email" >Email address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter email"
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
                                    className="btn btn-lg btn-primary btn-block mb-5"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mb-5 mt-5">v</div>

            </div>
        )
    }
}
export default AdministratorLogin;
