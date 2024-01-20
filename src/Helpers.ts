export default class Helpers {
  static toKebabCase(input: string) {
    return input.replaceAll(/ /g, "-").toLowerCase();
  }

  static capitalize(input: string) {
    const initial = input.charAt(0);
    return initial.toUpperCase() + input.slice(1);
  }

  static getMonthName(monthIndex: number) {
    const MONTH_NAMES: { [key: string]: string } = {
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

  static getSplitDate(date: string) {
    const [year, month] = date.split("-");
    return { year, month };
  }

  static formatMonthInputDate({
    month,
    year,
    monthFirst,
    twoDigitsYear,
  }: {
    month: string;
    year: string;
    monthFirst: boolean;
    twoDigitsYear: boolean;
  }) {
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

  static getCurrentDateString() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // The months returned by getMonth are zero-based, so we need to add 1
    const currentMonth = currentDate.getMonth() + 1;
    // The month also needs to be two-digits long, so we may need to padd it with a 0 at the start
    return `${currentYear}-${
      currentMonth >= 10 ? currentMonth : `0${currentMonth}`
    }`;
  }

  static randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
