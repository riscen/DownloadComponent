import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { Link } from 'react-router-dom';

import Upload from "./upload/Upload"; //All of us
import Download from "./download/Download"; //Raul
import Consult from "./Charts"; //Lalo
//import Loggin from './SignInForm';//Fer
import "../css/bootstrap.css";
import "../css/dashboard.css";

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveTab: 0
    };
    this.navBetweenTabs = this.navBetweenTabs.bind(this);
  }

  g(control) {
    return document.getElementById(control);
  }

  navBetweenTabs(event) {
    event.preventDefault();
    this.g("aUpload").classList.remove("active");
    this.g("aDownload").classList.remove("active");
    this.g("aConsult").classList.remove("active");
    this.g("aSecurity").classList.remove("active");
    switch (event.target.id) {
      case "aUpload": //UploadFile
        this.g("aUpload").classList.add("active");
        ReactDOM.render(<Upload />, document.getElementById("main"));
        this.setState({ currentActiveTab: 0 });
        break;
      case "aDownload": //Download File
        this.g("aDownload").classList.add("active");
        ReactDOM.render(<Download />, document.getElementById("main"));
        this.setState({ currentActiveTab: 1 });
        break;
      case "aConsult": //Check Charts
        this.g("aConsult").classList.add("active");
        ReactDOM.render(<Consult />, document.getElementById("main"));
        this.setState({ currentActiveTab: 2 });
        break;
      default:
        //doNthing
        break;
    }
  }

  render() {
    let userNameHeaderStyle = {
      paddingLeft: "2%",
      paddingTop: "0.7em"
    };

    let noPadding = {
      paddingTop: "0px"
    };
    return (
      <div className="container-fluid" id="top">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#top">
            Logged in by:
          </a>
          <h6 className="bg-dark w-100 text-white" style={userNameHeaderStyle}>
            {this.props.data.name}
          </h6>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="#top">
                Sign out
              </a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="aUpload"
                      href="#"
                      onClick={this.navBetweenTabs}
                    >
                      <span data-feather="home" />
                      Upload File
                      <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" id="aDownload" onClick={this.navBetweenTabs}>
                      <span data-feather="file"> </span>
                      Download WSINF
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" id="aConsult" onClick={this.navBetweenTabs}>
                      <span data-feather="shopping-cart"> </span>
                      Consult Charts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" id="aSecurity" onClick={this.navBetweenTabs}>
                      <span data-feather="users" />
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4" style={noPadding}>
              <div id="main" />
            </main>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    //feather.replace();//Pinta iconos en el menu
    ReactDOM.render(<Upload />, document.getElementById("main"));
  }
}

export default MainApp;
