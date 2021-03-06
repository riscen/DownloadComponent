/**
 * Start: 22-10-2018
 * Author: Raul Ivan Sanchez Contreras
 * Last modified: 22-10-2018
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { Eye, ArrowDownCircle } from "react-feather";
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

    this.seeFile = this.seeFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
    this.handleFilterDataChange = this.handleFilterDataChange.bind(this);
  }

  seeFile(fileId) {
    console.log("Select: ", fileId);
  }

  downloadFile(fileId) {
    console.log("Download: ", fileId);
  }

  handleFilterDataChange(filters) {
    this.setState({
      filters: filters
    });
  }

  componentWillMount() {
    let files = [],
      user,
      timePeriod;
    for (let i = 0; i < 100; i++) {
      user = i < 50 ? "riscen sanchez" : "raul sanchez";
      timePeriod = {
        from: {
          year: 2018,
          month: 11,
          day: i % 2 ? 1 : 15
        },
        to: {
          year: 2018,
          month: 11,
          day: i % 2 ? 15 : 30
        }
      };

      files = [
        ...files,
        {
          id: i,
          uploadedBy: user,
          department: "department" + Math.floor(i / 10),
          timePeriod: timePeriod,
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
    //const filteredFiles = this.state.files;
    const filteredFiles = this.state.files.filter(file => {
      if (
        file.uploadedBy.includes(filters.uploadedBy) &&
        file.department.includes(filters.department) &&
        (file.timePeriod.from.year > filters.timePeriod.from.year ||
          (file.timePeriod.from.year === filters.timePeriod.from.year &&
            file.timePeriod.from.month >= filters.timePeriod.from.month)) &&
        (file.timePeriod.to.year < filters.timePeriod.to.year ||
          (file.timePeriod.to.year === filters.timePeriod.to.year &&
            file.timePeriod.to.month <= filters.timePeriod.to.month)) &&
        file.uploadDate.includes(filters.uploadDate)
      )
        return file;
    });
    const files = filteredFiles.map((file, index) => {
      return (
        <tr key={file.id} className="file-download-table-row">
          <td>{file.uploadedBy}</td>
          <td>{file.department}</td>
          <td>{`${mapDate(file.timePeriod.from)} to ${mapDate(file.timePeriod.to)}`}</td>
          <td>{file.uploadDate}</td>
          <td>
            <div className="button-container">
              <Button outline color="primary" onClick={id => this.seeFile(file.id)}>
                <Eye />
              </Button>{" "}
              <Button outline color="primary" onClick={id => this.downloadFile(file.id)}>
                <ArrowDownCircle />
              </Button>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <div className="container-fluid">
        <h1 className="h2">Finance Files</h1>
        <div className="row">
          <div className="col-sm-12 d-none d-md-block" style={marginTop}>
            <div className="download-description">
              <label htmlFor="getPath">Select the file to download</label>
            </div>
            <DownloadFilter handleFilterDataChange={this.handleFilterDataChange} />
            <div className="file-download-table">
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th className="file-download-table-cell">Uploaded by</th>
                    <th className="file-download-table-cell">Department</th>
                    <th className="file-download-table-cell">Time Period</th>
                    <th className="file-download-table-cell">Upload Date</th>
                    <th className="file-download-table-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>{files}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Download;
