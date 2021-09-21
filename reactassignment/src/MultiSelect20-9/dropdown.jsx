import React, { Component } from "react";

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    handleChanged = (evt) => {
        const selected = [];
        for (let i = 0; i < evt.target.selectedOptions.length; i++) {
            selected.push(evt.target.selectedOptions.item(i).value)
        }
        this.setState({ data: selected }, () => this.props.selectedValues(this.state.data));
    }
    render() {
        return (
            <select className="form-control" multiple onChange={this.handleChanged.bind(this)} >
                {this.props.dataSource.map((x, idx) => (
                    <option key={idx} value={x}>{x}</option>
                ))}
            </select>
        );
    }
}
export default DropDown;