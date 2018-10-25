/**
 * Start: 22-10-2018
 * Author: Raul Ivan Sanchez Contreras
 * Last modified: 22-10-2018
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DownloadFilter from "./DownloadFilter";

import "../../css/download.css";

class Download extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      filters: {}
    };

    this.handleClick = this.handleClick.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.handleFilterDataChange = this.handleFilterDataChange.bind(this);
  }

  handleClick(fileId) {
    console.log("Select: ", fileId);
  }

  downloadFile(file) {
    console.log("Download: ", file);
  }

  handleFilterDataChange(filters) {
    console.log(filters);
    this.setState({
      filters: filters
    });
  }

  componentWillMount() {
    let files = [],
      user,
      timePeriod;
    for (let i = 0; i < 10; i++) {
      user = i < 5 ? "riscen" : "raul";
      timePeriod = i % 2 === 0 ? "Sep/2018 to Oct/2018" : "Oct/2018 to Nov/2018";

      files = [
        ...files,
        {
          id: i,
          username: "user" + i,
          timePeriod: timePeriod,
          uploadedBy: user,
          uploadDate: "22/10/2018"
        }
      ];
    }
    this.setState({
      files: files
    });
  }

  componentWillUnmount() {
    console.log("Unmount download component");
  }

  render() {
    let marginTop = {
      marginTop: "2%"
    };
    const filteredFiles = this.state.files.filter(file => {
      if (
        file.username.includes(this.state.filters.user) &&
        file.uploadedBy.includes(this.state.filters.uploadedBy) &&
        file.uploadDate.includes(this.state.filters.uploadDate)
      )
        return file;
    });
    const files = filteredFiles.map((file, index) => {
      return (
        <tr
          key={file.id}
          className="file-download-table-row"
          onClick={id => this.handleClick(file.id)}
          onDoubleClick={f => this.downloadFile(file)}
        >
          <td>{file.username}</td>
          <td>{file.timePeriod}</td>
          <td>{file.uploadedBy}</td>
          <td>{file.uploadDate}</td>
        </tr>
      );
    });
    return (
      <div className="container-fluid">
        <h1 className="h2">File download</h1>
        <div className="row">
          <div className="col-sm-12 d-none d-md-block" style={marginTop}>
            <div className="download-description">
              <label htmlFor="getPath">Select the file to download</label>
            </div>
            <DownloadFilter handleFilterDataChange={this.handleFilterDataChange} />
            <div className="file-download-table">
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Time period</th>
                    <th>Uploaded by:</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>{files}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Download;
