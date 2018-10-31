import React, { Component } from "react";
import { Table, TableRow } from "reactstrap";
import PropTypes from "prop-types";
import CalendarDay from "./CalendarDay";
import CalendarModal from "./CalendarModal";
import { WEEK_DAYS, DAY_TYPE, DAYS_IN_MONTH } from "../../constants/util";

import "../../css/calendar.css";

class CalendarMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: null,
      selectedDay: 1,
      modalOpen: false
    };

    this.showModal = this.showModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getDayType = this.getDayType.bind(this);
  }

  showModal(dayNum) {
    this.setState({ selectedDay: dayNum, modalOpen: true });
  }

  toggleModal() {
    this.setState({ modalOpen: false });
  }

  getDayType(type) {
    /*const selectedDay = this.state.selectedDay - 1,
      month = this.state.month;
    this.setState({
      month: [...month.slice(0, selectedDay), type, ...month.slice(selectedDay + 1)]
    });*/
    this.props.getDayType(this.state.selectedDay - 1, type);
    this.toggleModal();
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
    const totalDays = new Date(this.props.year, this.props.month + 1, 0).getDate();
    const monthDay = new Date(this.props.year, this.props.month, 1).getDay();
    const headersDays = WEEK_DAYS.map((day, index) => {
      return (
        <th key={`h-${index}`} className="calendar-table-header-cell">
          {day}
        </th>
      );
    });
    let dayRows = [];
    for (let i = 0, j = 0; i < totalDays + monthDay; i += 7) {
      dayRows.push(
        <tr key={i} className="calendar-table-row">
          {WEEK_DAYS.map((day, index) => {
            if (i + index >= monthDay && i + index < totalDays + monthDay) {
              return (
                <CalendarDay
                  key={`d-${index}`}
                  weekDay={
                    i + index >= monthDay && i + index < totalDays + monthDay ? day : WEEK_DAYS[0]
                  }
                  dayNum={j + 1}
                  dayType={this.props.monthTypes[j++]}
                  handleClick={this.showModal}
                />
              );
            }
            return <td key={`d-${index}`} className="caledar-table-day-cell day-disable" />;
          })}
        </tr>
      );
    }
    return (
      <React.Fragment>
        <Table bordered responsive style={{ height: "500px" }}>
          <thead>
            <tr>{headersDays}</tr>
          </thead>
          <tbody>{dayRows}</tbody>
        </Table>
        {this.state.modalOpen ? (
          <CalendarModal
            isOpen={this.state.modalOpen}
            day={this.state.selectedDay}
            dayType={this.state.month[this.state.selectedDay - 1]}
            weekDay={this}
            month={this.props.month}
            year={this.props.year}
            toggle={this.toggleModal}
            accept={this.getDayType}
          />
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
}

CalendarMonth.propTypes = {
  getDayType: PropTypes.func,
  month: PropTypes.any,
  monthTypes: PropTypes.any,
  year: PropTypes.any
};

export default CalendarMonth;
