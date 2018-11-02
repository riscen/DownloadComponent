import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import { ChevronDown, ChevronUp } from "react-feather";
import CalendarMonth from "./CalendarMonth";
import { MONTHS_LONG, DAYS_IN_MONTH } from "../../constants/util";

import "../../css/calendar.css";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: null,
      monthDropDownOpen: false,
      yearDropDownOpen: false,
      selectedMonth: new Date().getMonth() + 1,
      selectedYear: new Date().getFullYear()
    };

    this.toggleYear = this.toggleYear.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.toggleMonth = this.toggleMonth.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.getDayType = this.getDayType.bind(this);
    this.saveMonth = this.saveMonth.bind(this);
    this.submitMonth = this.submitMonth.bind(this);
  }

  validateMonth() {
    return true;
  }

  toggleYear() {
    this.setState({
      yearDropDownOpen: !this.state.yearDropDownOpen
    });
  }

  toggleMonth() {
    this.setState({
      monthDropDownOpen: !this.state.monthDropDownOpen
    });
  }

  selectMonth(val) {
    this.setState({
      selectedMonth:
        typeof val === "number"
          ? val
          : MONTHS_LONG.findIndex(month => val.target.innerText === month)
    });
  }

  selectYear(event) {
    const date = new Date();
    if (
      parseInt(event.target.innerText) === date.getFullYear() &&
      this.state.selectedMonth > date.getMonth() + 1
    ) {
      this.selectMonth(date.getMonth() + 1);
    }
    this.setState({
      selectedYear: parseInt(event.target.innerText)
    });
  }

  getDayType(days, type) {
    let month = this.state.month;
    for (let i = 0; i < days.length; i++) {
      month = [...month.slice(0, days[i] - 1), type, ...month.slice(days[i])];
    }
    this.setState({
      month: month
    });
    /*this.setState({
      month: [...month.slice(0, day), type, ...month.slice(day + 1)]
    });*/
  }

  saveMonth() {
    console.log("Save");
  }

  submitMonth() {
    console.log("Submit");
  }

  componentWillMount() {
    //Fill month. When service is up, fill it with data from server
    let month = [];
    for (let i = 0; i < DAYS_IN_MONTH; i++) {
      month.push({ symbol: "", name: "", description: "" });
    }
    this.setState({
      month: month
    });
  }

  render() {
    const date = new Date();
    let filterMonths;
    if (this.state.selectedYear !== date.getFullYear()) {
      filterMonths = MONTHS_LONG;
    } else {
      filterMonths = MONTHS_LONG.filter((month, index) => index <= date.getMonth() + 1);
    }
    const monthItems = filterMonths.map((month, index) => {
      return (
        <DropdownItem key={index} onClick={this.selectMonth}>
          {month}
        </DropdownItem>
      );
    });
    //Replace with actual data, lastYear register by user
    const yearItems = [null, null, null, null, null, null, null, null].map((element, index) => {
      return (
        <DropdownItem key={index} onClick={this.selectYear}>
          {new Date().getFullYear() - index}
        </DropdownItem>
      );
    });

    return (
      <div className="calendar-container">
        <div className="calendar-title">
          <div className="calendar-user-data">
            <h3>SAP ID</h3>
            <h4>Lastname, Name</h4>
          </div>
          <div className="calendar-time">
            <div className="calendar-year">
              <Dropdown isOpen={this.state.yearDropDownOpen} toggle={this.toggleYear}>
                <DropdownToggle
                  tag="span"
                  onClick={this.toggleYear}
                  data-toggle="dropdown"
                  aria-expanded={this.state.yearDropDownOpen}
                >
                  <h4>
                    {this.state.selectedYear}{" "}
                    {!this.state.yearDropDownOpen ? <ChevronDown /> : <ChevronUp />}
                  </h4>
                </DropdownToggle>
                <DropdownMenu right>{yearItems}</DropdownMenu>
              </Dropdown>
            </div>

            <div className="calendar-month">
              <Dropdown isOpen={this.state.monthDropDownOpen} toggle={this.toggleMonth}>
                <DropdownToggle
                  tag="span"
                  onClick={this.toggleMonth}
                  data-toggle="dropdown"
                  aria-expanded={this.state.monthDropDownOpen}
                >
                  <h4>
                    {MONTHS_LONG[this.state.selectedMonth]}{" "}
                    {!this.state.monthDropDownOpen ? <ChevronDown /> : <ChevronUp />}
                  </h4>
                </DropdownToggle>
                <DropdownMenu right>{monthItems}</DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="calendar-month-container">
          <CalendarMonth
            year={this.state.selectedYear}
            month={this.state.selectedMonth}
            monthTypes={this.state.month}
            getDayType={this.getDayType}
          />
        </div>
        <div className="calendar-button-group">
          <Button color="primary" size="lg" onClick={this.saveMonth}>
            Save
          </Button>{" "}
          <Button color="success" size="lg" onClick={this.submitMonth}>
            Submit
          </Button>{" "}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {};

export default Calendar;
