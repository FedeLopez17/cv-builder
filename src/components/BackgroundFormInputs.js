import React from "react";
import data from "../data";
import Helpers from "../Helpers";

export default class BackgroundFormInputs extends React.Component {
  render() {
    const {
      inputValues,
      handleChange,
      wrapper,
      inputOneName,
      inputTwoName,
      isEducation,
    } = this.props;

    const placeHolderOne = isEducation
      ? "Bachelor of Science in Computer Science"
      : "Data Analyst";
    const placeHolderTwo = isEducation
      ? "Massachusetts Institute of Technology"
      : "Google";

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    // The months returned by getMonth are zero-based, so we need to add 1
    let currentMonth = currentDate.getMonth() + 1;
    // The month also needs to be two-digits long, so we may need to padd it with a 0 at the start
    if (currentMonth < 10) currentMonth = `0${currentMonth}`;
    const maxDate = `${currentYear}-${currentMonth}`;
    const minDate = "1950-01";

    return (
      <>
        <label htmlFor={`${inputOneName}-input`}>
          {Helpers.capitalize(inputOneName)}:
        </label>
        <input
          type="text"
          id={`${inputOneName}-input`}
          placeholder={placeHolderOne}
          list={`${inputOneName}-list`}
          autoComplete="off"
          name={inputOneName}
          value={inputValues[inputOneName]}
          onChange={handleChange}
        ></input>
        <datalist id={`${inputOneName}-list`}>
          {data[`${inputOneName}s`].map((ele, index) => (
            <option value={ele} key={index} />
          ))}
        </datalist>

        <label htmlFor={`${inputTwoName}-input`}>
          {Helpers.capitalize(inputTwoName)}:
        </label>
        <input
          type="text"
          id={`${inputTwoName}-input`}
          placeholder={placeHolderTwo}
          autoComplete="off"
          name={inputTwoName}
          value={inputValues[inputTwoName]}
          onChange={handleChange}
        ></input>

        <label htmlFor={`${wrapper}-from-date-input`}>From:</label>
        <input
          type="month"
          min={minDate}
          max={maxDate}
          id={`${wrapper}-from-date-input`}
          name="fromDate"
          value={inputValues.fromDate}
          onChange={handleChange}
        ></input>

        <label htmlFor={`${wrapper}-to-date-input`}>To:</label>
        <input
          type="month"
          min={minDate}
          max={maxDate}
          id={`${wrapper}-to-date-input`}
          name="toDate"
          value={inputValues.toDate}
          disabled={inputValues.inProgress}
          onChange={handleChange}
        ></input>

        <label htmlFor={`${wrapper}-in-progress-input`}>
          Still {isEducation ? "studying" : "working"}:
        </label>
        <input
          type="checkbox"
          checked={inputValues.inProgress}
          d={`${wrapper}-in-progress-input`}
          name="inProgress"
          value={inputValues.inProgress}
          onChange={handleChange}
        />
      </>
    );
  }
}
