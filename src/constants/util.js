export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const DAY_TYPE = {
  SHIFT_NACC: {
    symbol: "S",
    name: "Shift Nacc",
    description: ""
  },
  NIGHT_SHIFT: {
    symbol: "NS",
    name: "Night Shift",
    description: "The employee will take the night shift."
  },
  GENERAL_ODC_WORK: {
    symbol: "G",
    name: "General ODC Work",
    description: ""
  },
  OUT_OF_OFFICE: {
    symbol: "O",
    name: "Out Of Office",
    description: "The employee won't come to work (day off)."
  },
  VACATION: {
    symbol: "V",
    name: "Vacation",
    description: "The employee will take a vacation day."
  },
  HOLIDAY: {
    symbol: "H",
    name: "Holiday",
    description: "The company will have a holiday (day off)."
  },
  SUSTAINMENT: {
    symbol: "SUS",
    name: "Sustainment",
    description: ""
  },
  SECONDARY: {
    symbol: "SEC",
    name: "Secondary",
    description: "(Not Eligible for Bonus)"
  },
  TRAINING: {
    symbol: "T",
    name: "Training",
    description: "The employee will have a special training."
  },
  MORNING_SHIFT: {
    symbol: "MS",
    name: "Morning Shift",
    description: "The employee will take the morning shift (only on weekends)."
  }
};

export const EXTRA_DAY_TYPE = {
  symbol: "x",
  name: "Remain",
  description: "This day is not selectable"
};

export const DAYS_IN_MONTH = 31;
