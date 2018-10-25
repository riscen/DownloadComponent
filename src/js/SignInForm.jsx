import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    //e.preventDefault();
    this.props.handleChange(this.state);
  }

  render() {
    return (
      <div className="FormCenter">
        <form className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Name
            </label>
            <input
              type="name"
              id="name"
              className="FormField__Input"
              placeholder="Enter your name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="FormField__Input"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <Link to="MainApp">
              <button className="FormField__Button mr-20" onClick={this.handleSubmit}>
                Sign In
              </button>
            </Link>
            {/*<button className="FormField__Button mr-20">Sign In</button>*/}
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
