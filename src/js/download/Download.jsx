/**
 * Start: 22-10-2018
 * Author: Raul Ivan Sanchez Contreras
 * Last modified: 22-10-2018
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DownloadFilter from "./DownloadFilter";
import { mapDate } from "../util/";

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
    for (let i = 0; i < 100; i++) {
      user = i < 50 ? "riscen" : "raul";
      timePeriod = {
        from: {
          year: 2018,
          month: i % 2 ? 9 : 10
        },
        to: {
          year: 2018,
          month: i % 2 ? 10 : 11
        }
      };

      files = [
        ...files,
        {
          id: i,
          username: "user" + Math.floor(i / 10),
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
    const filters = this.state.filters;
    const filteredFiles = this.state.files.filter(file => {
      if (
        file.username.includes(filters.user) &&
        (file.timePeriod.from.year > filters.timePeriod.from.year ||
          (file.timePeriod.from.year === filters.timePeriod.from.year &&
            file.timePeriod.from.month >= filters.timePeriod.from.month)) &&
        (file.timePeriod.to.year < filters.timePeriod.to.year ||
          (file.timePeriod.to.year === filters.timePeriod.to.year &&
            file.timePeriod.to.month <= filters.timePeriod.to.month)) &&
        file.uploadedBy.includes(filters.uploadedBy) &&
        file.uploadDate.includes(filters.uploadDate)
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
          <td>{`${mapDate(file.timePeriod.from)} to ${mapDate(file.timePeriod.to)}`}</td>
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
