import React from "react";
import PropTypes from "prop-types";

const CalendarDay = props => {
  return (
    <td className="caledar-table-day-cell" onClick={dayNum => props.handleClick(props.dayNum)}>
      <div className="calendar-day-left">
        <div className="calendar-day-number">{props.dayNum}</div>
        <div className="calendar-day-name">{props.dayType.name}</div>
      </div>
      <div className="calendar-day-type">{props.dayType.symbol}</div>
    </td>
  );
};

CalendarDay.propTypes = {
  dayNum: PropTypes.any,
  dayType: PropTypes.object,
  handleClick: PropTypes.func,
  weekDay: PropTypes.any
};

export default CalendarDay;
