import React from "react";
import YearPicker from "./YearPicker";

export default class EducationForm extends React.Component {
  render() {
    const { education, handleChange, addEntry, deleteEntry } = this.props;

    console.log(education);

    const educationArr = education.map((ed) => (
      <section className="education" key={ed.id}>
        <label for={`ed-institution-${ed.id}`}>Institution:</label>
        <input
          type="text"
          placeholder="Harvard"
          data-id={ed.id}
          form="education"
          id={`ed-institution-${ed.id}`}
          name="institutionName"
          value={ed.institutionName}
          onChange={handleChange}
        />

        <label for={`ed-degree-${ed.id}`}>Degree:</label>
        <input
          type="text"
          placeholder="Bachelor's in Computer Science"
          data-id={ed.id}
          form="education"
          id={`ed-degree-${ed.id}`}
          name="degree"
          value={ed.degree}
          onChange={handleChange}
        />

        <label for={`ed-from-${ed.id}`}>From:</label>
        <YearPicker
          dataId={ed.id}
          form="education"
          id={`ed-from-${ed.id}`}
          name="fromDate"
          value={ed.fromDate}
          handleChange={handleChange}
        />

        <label for={`ed-to-${ed.id}`}>To:</label>
        <YearPicker
          dataId={ed.id}
          form="education"
          id={`ed-to-${ed.id}`}
          name="toDate"
          value={ed.toDate}
          handleChange={handleChange}
        />

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
