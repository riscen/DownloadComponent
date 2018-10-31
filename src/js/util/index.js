import { MONTHS } from "../../constants/util";

export function mapDate(date) {
  if (date) {
    const { day, year, month } = date;
    let mappedDate = "";
    if (day) {
      mappedDate += `${day}/`;
    }
    if (month) {
      mappedDate += `${MONTHS[month]}/`;
    }
    if (year) {
      mappedDate += `${year}`;
    }
    return mappedDate;
  }
  return "";
}

export function bytesToMb(bytes, decimals) {
  if (bytes === 0) return "0 Bytes";
  var k = 1024,
    dm = decimals <= 0 ? 0 : decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
