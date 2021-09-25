import React, { Component } from 'react';
class Valid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: 0,
            RegUserName: null,
            RegPAssword: null,
            erros: []
        }
    }
    handleInPutChanges = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    };
    register() {
        let a = [];
        if (this.state.UserId === 0 || this.state.UserId === undefined) {
            a.push('InValid Userid ');
        }
        if (this.state.RegUserName === null || this.state.RegUserName === undefined) {
            a.push('InValid UserName ');
        }
        if (this.state.RegPAssword === null || this.state.RegPAssword === undefined) {
            a.push('password not strong');
        }
        console.log(a);
        this.setState({erros : a});
        console.log(this.state.erros);
    }
    render() {
        return (
            <div className="container">
                <div className="p-5 m-5">
                    <table className="table table-bordred table-striped w-50">
                        <tbody>
                            <tr>
                                <td>User Id</td>
                                <td>
                                    <input
                                        type="text"
                                        name="UserId"
                                        onChange={this.handleInPutChanges.bind(this)}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>User Name</td>
                                <td>
                                    <input
                                        type="text"
                                        name="RegUserName"
                                        value={this.state.RegUserName}
                                        onChange={this.handleInPutChanges.bind(this)}
                                        className="form-control"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="RegPAssword"
                                        value={this.state.RegPAssword}
                                        onChange={this.handleInPutChanges.bind(this)}
                                    />
                                </td>
                            </tr>
                            <tr className="text-danger">
                                <ul>
                                {
                                    this.state.erros.map((emp, idx) => (
                                        <li key={idx}>
                                            {emp}
                                        </li>
                                    ))}
                                </ul>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="button"
                                        value="Register"
                                        onClick={this.register.bind(this)}
                                        className="btn btn-success"
                                    />
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Valid;