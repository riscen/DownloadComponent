import React, { Component } from "react";
import { Link } from "react-router-dom";

class Upload extends Component {
  constructor() {
    super();

    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  g(control) {
    return document.getElementById(control);
  }

  handleFileSelect(evt) {
    evt.preventDefault();
    debugger;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var files = evt.target.files; // FileList object
      var control = this.g("getPath");
    } else {
      alert("The File APIs are not fully supported in this browser.");
    }
  }

  //  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  render() {
    let marginTop = {
      marginTop: "2%"
    };

    let marginTop1 = {
      marginTop: "1%"
    };

    let inLine = {
      display: "inline"
    };

    let marginLeft = {
      marginLeft: "1%"
    };

    return (
      <div className="container-fluid">
        <h1 className="h2">Upload file</h1>
        <div className="row">
          <div className="col-sm-12 d-none d-md-block" style={marginTop}>
            <label htmlFor="getPath">Select the file</label>
            <br />
            <input
              type="file"
              data-icon="false"
              id="getPath"
              className="form-control-file col-sm-4"
              style={inLine}
            />
            <button
              id="btnExplore"
              className="btn btn-success"
              style={marginLeft}
              onClick={this.handleFileSelect}
            >
              Upload
            </button>
            {/*<div class="clearfix" style={marginTop1}>
                  <button id="btnUpload" className="btn btn-success"  >Upload</button> 
                </div>*/}
          </div>
        </div>
      </div>
    );
  }
}
export default Upload;
