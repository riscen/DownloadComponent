import React, { Component } from "react";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "react-feather";

import "../../css/upload.css";

class UploadUserFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showControls: false,
      files: []
    };

    this.handleShowControls = this.handleShowControls.bind(this);
  }

  handleShowControls() {
    const growDiv = document.getElementsByClassName("upload-uf-grow")[0];
    growDiv.style.height = growDiv.clientHeight
      ? 0
      : document.querySelector(".upload-props-container").clientHeight + "px";
    this.setState({
      showControls: !this.state.showControls
    });
  }

  componentDidMount() {
    let files = [];
    for (let i = 0; i < 10; i++) {
      files = [...files, "test" + i + ".txt"];
    }
  }

  render() {
    return (
      <div className="upload-uf-container">
        <div className="upload-uf-title-container" onClick={this.handleShowControls}>
          <span className="upload-uf-title">
            Hour file: <span className="upload-uf-title-name">file.txt</span>
          </span>
          <span className="upload-uf-title-icon">
            {this.state.showControls ? <ChevronUp /> : <ChevronDown />}
          </span>
        </div>
        <div className="upload-uf-grow">
          <div className="upload-uf-props-container">
            <div className="upload-input-text">
              <h6>Choose files</h6>
              <div className="upload-input-file">
                <input
                  className="upload-input-file-url"
                  type="text"
                  placeholder="File url"
                  readOnly
                />
              </div>
            </div>

            <div className="upload-uf-table-container">
              <table className="upload-uf-table table-bordered">
                <thead>
                  <tr>
                    <th className="upload-uf-no-cell">No.</th>
                    <th>File url</th>
                  </tr>
                </thead>
              </table>
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

UploadUserFile.propTypes = {
  handleFileSelect: PropTypes.any
};

export default UploadUserFile;
