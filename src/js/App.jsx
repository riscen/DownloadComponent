import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import "../css/App.css";
import SignInForm from "./SignInForm";
import MainApp from "./MainApp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(data) {
    this.setState(
      {
        name: data.name,
        password: data.password
      },
      console.log(data)
    );
  }

  render() {
    let noPadding = {
      paddingTop: "2%"
    };
    return (
      <Router>
        <div className="App">
          <div className="App__Form">
            <div className="FormTitle">
              <NavLink
                to="/sign-in"
                activeClassName="FormTitle__Link--Active"
                className="FormTitle__Link"
                style={noPadding}
              >
                Sign In
              </NavLink>
            </div>
            {/*<Route path="/sign-in" component={SignInForm} components={{handleChange: this.handleChange}}  />*/}
            <Route
              path="/sign-in"
              render={props => <SignInForm {...props} handleChange={this.handleChange} />}
            />
            {/*<SignInForm handleChange={this.handleChange} />  */}
            <div className="Layout_Template">
              {/*<Route path="/MainApp" component={MainApp} components={{data: this.state}}/>*/}
              <Route path="/MainApp" render={props => <MainApp {...props} data={this.state} />} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
