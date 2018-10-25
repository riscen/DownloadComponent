import React, { Component } from "react";
import MonthPicker from "react-month-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { ChevronDown, ChevronUp } from "react-feather";

import { formatDate, parseDate } from "react-day-picker/moment";

import "react-month-picker/css/month-picker.css";
import "react-day-picker/lib/style.css";

class DownloadFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideFilters: true,
      user: "",
      uploadBy: "",
      timePeriod: {
        from: null,
        to: null
      },
      uploadDate: null,
      showFromDate: false,
      showToDate: false
    };

    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Spr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    this.handleFilterViewChange = this.handleFilterViewChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.showFromDate = this.showFromDate.bind(this);
    this.hideFromDate = this.hideFromDate.bind(this);
    this.showToDate = this.showToDate.bind(this);
    this.hideToDate = this.hideToDate.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  getFilters(user, uploadBy, uploadDate) {
    console.log("UD; ", uploadDate);
    return {
      user: user !== null ? user : this.state.user,
      uploadedBy: uploadBy !== null ? uploadBy : this.state.uploadBy,
      uploadDate: uploadDate === null ? "" : formatDate(uploadDate, "DD/MM/YYYY")
    };
  }

  handleFilterViewChange() {
    if (!this.state.hideFilters) {
      this.setState({
        hideFilters: true,
        user: "",
        uploadBy: "",
        timePeriod: {
          from: null,
          to: null
        },
        uploadDate: null,
        showFromDate: false,
        showToDate: false
      });
    } else
      this.setState({
        hideFilters: false
      });
  }

  handleTextChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.handleFilterDataChange(
      this.getFilters(
        event.target.name === "user" ? event.target.value : null,
        event.target.name === "uploadBy" ? event.target.value : null,
        this.state.uploadDate
      )
    );
  }

  handleFromDateChange(year, month) {
    console.log(year, this.months[month - 1]);
    this.hideFromDate();
    this.setState({
      timePeriod: {
        from: { year: year, month: month },
        to: this.state.timePeriod.to
      }
    });
  }

  mapDate(date) {
    if (date) {
      const { year, month } = date;
      return `${this.months[month - 1]}/${year}`;
    }
    return "";
  }

  handleToDateChange(year, month) {
    console.log(year, this.months[month - 1]);
    this.hideToDate();
    this.setState({
      timePeriod: {
        from: this.state.timePeriod.from,
        to: { year: year, month: month }
      }
    });
  }

  handleDateChange(date) {
    this.setState({
      uploadDate: date
    });
    this.props.handleFilterDataChange(this.getFilters(null, null, date));
  }

  showFromDate() {
    this.hideToDate();
    this.setState({
      showFromDate: true
    });
  }

  hideFromDate() {
    this.setState({
      showFromDate: false
    });
  }

  showToDate() {
    this.hideFromDate();
    this.setState({
      showToDate: true
    });
  }

  hideToDate() {
    this.setState({
      showToDate: false
    });
  }

  componentDidMount() {
    this.props.handleFilterDataChange(this.getFilters(null, null, null));
    //feather.replace(); //Pinta iconos en el menu
  }

  render() {
    const { from, to } = this.state.timePeriod;
    const modifiers = { start: from, end: to };
    let pickerLang = {
        from: "From",
        to: "To"
      },
      mrange = { from: { year: 2014, month: 8 }, to: { year: 2015, month: 5 } };
    let makeText = m => {
      if (m && m.year && m.month) return pickerLang.months[m.month - 1] + ". " + m.year;
      return "?";
    };
    let yearRange = [],
      date = new Date();
    for (let i = 0; i <= 20; i++) {
      yearRange = [...yearRange, date.getFullYear() - 20 + i];
    }
    const valueFromDate = this.state.timePeriod.from
      ? this.state.timePeriod.from
      : { year: date.getFullYear(), month: date.getMonth() + 1 };
    const valueToDate = this.state.timePeriod.to
      ? this.state.timePeriod.to
      : { year: date.getFullYear(), month: date.getMonth() + 1 };
    return (
      <div className={this.state.hideFilters ? "download-filter" : "download-filter active"}>
        <div className="download-filter-title" onClick={this.handleFilterViewChange}>
          <span>Filters</span>
          {this.state.hideFilters ? <ChevronDown /> : <ChevronUp />}
        </div>
        <div
          className={
            this.state.hideFilters
              ? "download-filter-container close"
              : "download-filter-container open"
          }
        >
          <div className="download-filter-field-container download-filter-user-container">
            <label className="download-filter-label">User: </label>
            <input
              type="text"
              className="download-filter-input-field"
              placeholder="Username"
              name="user"
              value={this.state.textUserFilter}
              onChange={this.handleTextChange}
            />
          </div>

          <div className="download-filter-field-container download-filter-time-period-container">
            <label className="download-filter-label">Time period: </label>
            <div className="InputFromTo">
              <div className="download-from-date el-inline">
                <MonthPicker
                  show={this.state.showFromDate}
                  years={yearRange}
                  value={valueFromDate}
                  lang={this.months}
                  onChange={this.handleFromDateChange}
                >
                  <input
                    type="text"
                    placeholder="From"
                    onFocus={this.showFromDate}
                    value={this.mapDate(this.state.timePeriod.from)}
                    readOnly
                  />
                </MonthPicker>
              </div>
              <div className="download-to-date el-inline">
                <MonthPicker
                  show={this.state.showToDate}
                  years={yearRange}
                  value={valueToDate}
                  lang={this.months}
                  onChange={this.handleToDateChange}
                >
                  <input
                    type="text"
                    placeholder="To"
                    onFocus={this.showToDate}
                    value={this.mapDate(this.state.timePeriod.to)}
                    readOnly
                  />
                </MonthPicker>
              </div>
            </div>
          </div>

          <div className="download-filter-field-container download-filter-uploaded-by-container">
            <label className="download-filter-label">Uploaded by: </label>
            <input
              type="text"
              className="download-filter-input-field"
              placeholder="Username"
              name="uploadBy"
              value={this.state.textUploaderFilter}
              onChange={this.handleTextChange}
            />
          </div>

          <div className="download-filter-field-container download-filter-upload-date-container">
            <label className="download-filter-label">Upload date: </label>
            <div>
              <DayPickerInput
                formatDate={formatDate}
                parseDate={parseDate}
                format="DD/MM/YYYY"
                placeholder={formatDate(new Date(), "DD/MM/YYYY")}
                onDayChange={this.handleDateChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DownloadFilter;
