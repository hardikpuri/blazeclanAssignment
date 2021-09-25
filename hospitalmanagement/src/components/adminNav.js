import React, { Component } from 'react';
import DoctorList from './CURDcomponents/doctor/doctorList';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
class adminNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Link to="/Doctor"><button className="btn btn-success" name="doctor">
                    Doctor
                </button></Link>
                <Link to="/Doctor"><button className="btn btn-success" name="doctor">
                </button></Link>
                {
                    <Switch>
                        <Route exact path="/Doctor" component={DoctorList}></Route>
                    </Switch>
                }
            </div>

        );
    }
}

export default adminNav;