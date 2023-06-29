import React from "react";
import YearPicker from "./YearPicker";

export default class EducationForm extends React.Component {
  render() {
    const { education, handleChange, addEntry, deleteEntry } = this.props;

    console.log(education);

    const educationArr = education.map((ed) => (
      <section className="education" key={ed.id}>
        <label>
          Institution:
          <input
            type="text"
            placeholder="Harvard"
            data-id={ed.id}
            form="education"
            name="institutionName"
            value={ed.institutionName}
            onChange={handleChange}
          />
        </label>
        <label>
          Degree:
          <input
            type="text"
            placeholder="Bachelor's in Computer Science"
            data-id={ed.id}
            form="education"
            name="degree"
            value={ed.degree}
            onChange={handleChange}
          />
        </label>
        <label>
          From:
          <YearPicker
            id={ed.id}
            form="education"
            name="fromDate"
            value={ed.fromDate}
            handleChange={handleChange}
          />
        </label>
        <label>
          To:
          <YearPicker
            id={ed.id}
            form="education"
            name="toDate"
            value={ed.toDate}
            handleChange={handleChange}
          />
        </label>
        <button
          type="button"
          data-id={ed.id}
          form="education"
          onClick={deleteEntry}
        >
          Delete
        </button>
      </section>
    ));

    return (
      <section className="Form" id="education-form">
        {educationArr}
        <button
          type="button"
          id="add-education-button"
          form="education"
          onClick={addEntry}
        >
          Add Education
        </button>
      </section>
    );
  }
}
