import { MONTHS } from "../../constants/util";

export function mapDate(date) {
  if (date) {
    const { year, month } = date;
    return `${MONTHS[month - 1]}/${year}`;
  }
  return "";
}
