import React, { Component } from "react";
import { Button, Row, Col, Table } from "reactstrap";
import Dropzone from "react-dropzone";
import { bytesToMb, mapDate } from "../util";

import "../../css/upload.css";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: [],
      fileUploaded: false
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleUpload() {
    /*this.setState({
      fileUploaded: true
    });*/
  }

  handleDelete() {
    this.setState({
      selectedFile: null
    });
  }

  handleDrop(acceptedFiles) {
    //mm/dd/yyyy
    //const date = new Date("11/16/2018");
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const from = {
      day: day >= 1 && day <= 15 ? 15 : 1,
      month: day >= 1 && day <= 15 ? month - 1 : month,
      year: date.getUTCFullYear()
    };
    const to = {
      day: day >= 1 && day <= 15 ? new Date(date.getFullYear(), month, 0).getDate() : 15,
      month: day >= 1 && day <= 15 ? month - 1 : month,
      year: date.getUTCFullYear()
    };
    this.setState({
      selectedFiles: acceptedFiles.map(file => {
        return {
          name: file.name,
          size: file.size,
          timePeriod: {
            from: from,
            to: to
          }
        };
      })
    });
  }

  render() {
    const buttonStyle = {
      width: "40%"
    };
    const dndStyle = {
      width: "100%",
      height: "100px",
      border: "1px solid #dbdbdb",
      borderRadius: "5px",
      cursor: "pointer"
    };
    const files = this.state.selectedFiles;
    const fileRows = files.map((file, index) => {
      return (
        <tr key={index}>
          <td>{file.name}</td>
          <td>{bytesToMb(file.size, 2)}</td>
          <td>{`${mapDate(file.timePeriod.from)} to ${mapDate(file.timePeriod.to)}`}</td>
          <td>
            <div className="upload-file-button-group">
              <Button
                outline
                color="success"
                size="sm"
                style={buttonStyle}
                disabled={this.state.fileUploaded}
                onClick={this.handleUpload}
              >
                Upload
              </Button>{" "}
              <Button
                outline
                color="danger"
                size="sm"
                style={buttonStyle}
                disabled={this.state.fileUploaded}
                onClick={this.handleDelete}
              >
                Delete
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="container-fluid">
        <h1 className="h2">Upload file</h1>
        <Row>
          <Col sm="12">
            <div className="upload-file-props">
              <span className="upload-file-title">File properties</span>
              <Table bordered>
                <thead>
                  <tr>
                    <th className="upload-file-name-cell">Name</th>
                    <th className="upload-file-size-cell">Size</th>
                    <th className="upload-file-date-cell">Time period</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{fileRows}</tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className="upload-file-dnd-container">
              <span className="upload-file-title">Search file</span>
              <div className="upload-dnd">
                <Dropzone onDrop={this.handleDrop} style={dndStyle}>
                  <span className="upload-dnd-label">
                    Click here to select a file or drop your file here
                  </span>
                </Dropzone>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Upload;
