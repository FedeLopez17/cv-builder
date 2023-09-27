import React from "react";
import InvalidInputMessage from "../InvalidInputMessage";
import RequiredFieldIndicator from "../RequiredFieldIndicator";

export default class ProjectFormInputs extends React.Component {
  render() {
    const { inputValues, invalidInputs, handleChange } = this.props;

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
        <section className="input-wrapper">
          <label htmlFor="project-name-input">
            Name: <RequiredFieldIndicator />
          </label>
          <input
            type="text"
            id="project-name-input"
            {...(invalidInputs.includes("name") && {
              className: "invalid",
            })}
            placeholder="PLACEHOLDER"
            autoComplete="off"
            name="name"
            value={inputValues.name}
            onChange={handleChange}
          ></input>
          {invalidInputs.includes("name") && <InvalidInputMessage />}
        </section>

        <section className="input-wrapper">
          <label htmlFor="project-description-input">Description:</label>
          <textarea
            id="project-description-input"
            placeholder="PLACEHOLDER"
            name="description"
            value={inputValues.description}
            onChange={handleChange}
          />
        </section>

        <section className="input-wrapper">
          <label htmlFor="project-website-input">Website:</label>
          <input
            type="text"
            id="project-website-input"
            placeholder="PLACEHOLDER"
            autoComplete="off"
            name="website"
            value={inputValues.website}
            onChange={handleChange}
          ></input>
        </section>

        <section className="input-wrapper">
          <label htmlFor="project-repository-input">Repository:</label>
          <input
            type="text"
            id="project-repository-input"
            placeholder="PLACEHOLDER"
            autoComplete="off"
            name="repository"
            value={inputValues.repository}
            onChange={handleChange}
          ></input>
        </section>

        <section className="input-wrapper">
          <label htmlFor="project-from-date-input">
            From: <RequiredFieldIndicator />
          </label>
          <input
            type="month"
            min={minDate}
            max={maxDate}
            {...(invalidInputs.includes("fromDate") && {
              className: "invalid",
            })}
            id="project-from-date-input"
            name="fromDate"
            value={inputValues.fromDate}
            onChange={handleChange}
          ></input>
          {invalidInputs.includes("fromDate") && <InvalidInputMessage />}
        </section>

        <section className="input-wrapper">
          <label htmlFor="project-to-date-input">
            To: <RequiredFieldIndicator />
          </label>
          <input
            type="month"
            min={minDate}
            max={maxDate}
            {...(invalidInputs.includes("toDate") && { className: "invalid" })}
            id="project-to-date-input"
            name="toDate"
            value={inputValues.toDate}
            disabled={inputValues.inProgress}
            onChange={handleChange}
          ></input>
          {invalidInputs.includes("toDate") && <InvalidInputMessage />}
        </section>
      </>
    );
  }
}
