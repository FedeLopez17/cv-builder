export default class Helpers {
  static toKebabCase(inputString) {
    return inputString.replaceAll(/ /g, "-").toLowerCase();
  }

  static capitalize(string) {
    const initial = string.charAt(0);
    return initial.toUpperCase() + string.slice(1);
  }

  static getMonthName(monthIndex) {
    const MONTH_NAMES = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };
    return MONTH_NAMES[monthIndex];
  }

  static formatMonthInputDate({ month, year, monthFirst, twoDigitsYear }) {
    if (twoDigitsYear) year = year.slice(2);
    const firstField = monthFirst ? month : year;
    const secondField = firstField === month ? year : month;

    return `${firstField}/${secondField}`;
  }

  static monthInputSupported() {
    const input = document.createElement("input");
    input.type = "month";
    return input.type === "month";
  }
}
