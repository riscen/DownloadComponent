import React, { Component } from "react";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "react-feather";

import "../../css/upload.css";

class UploadHourFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showControls: false
    };

    this.handleShowControls = this.handleShowControls.bind(this);
  }

  handleShowControls() {
    const growDiv = document.getElementsByClassName("upload-grow")[0];
    growDiv.style.height = growDiv.clientHeight
      ? 0
      : document.querySelector(".upload-props-container").clientHeight + "px";
    this.setState({
      showControls: !this.state.showControls
    });
  }

  render() {
    return (
      <div className="upload-hf-container">
        <div className="upload-hf-title-container" onClick={this.handleShowControls}>
          <span className="upload-hf-title">
            Hour file: <span className="upload-hf-title-name">file.txt</span>
          </span>
          <span className="upload-hf-title-icon">
            {this.state.showControls ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
        <div className="upload-grow">
          <div className="upload-props-container">
            <div className="upload-hf-dates">
              <h6>Dates</h6>
              <div className="upload-hf-date upload-hf-date-u">
                <span>Upload:</span>{" "}
                <input className="upload-hf-date-in" type="text" placeholder="Upload" readOnly />
              </div>
              <div className="upload-hf-date">
                <span>Expiration:</span>{" "}
                <input
                  className="upload-hf-date-in"
                  type="text"
                  placeholder="Expiration"
                  readOnly
                />
              </div>
            </div>

            <div className="upload-input-text">
              <h6>Choose file</h6>
              <div className="upload-input-file">
                <input
                  className="upload-input-file-url"
                  type="text"
                  placeholder="File url"
                  readOnly
                />
              </div>
            </div>

            <div className="upload-control-button">
              <div className="upload-button-search">
                <button className="button" type="button" onClick={this.props.handleFileSelect}>
                  Search
                </button>
              </div>
              <div className="upload-button-submit">
                <button
                  className="button-submit"
                  type="button"
                  onClick={this.props.handleFileSelect}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UploadHourFile.propTypes = {
  handleFileSelect: PropTypes.any
};

export default UploadHourFile;
