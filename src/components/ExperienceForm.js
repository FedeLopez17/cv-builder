import React from "react";
import YearPicker from "./YearPicker";

export default class ExperienceForm extends React.Component {
  render() {
    const { experience, handleChange, addEntry, deleteEntry } = this.props;

    console.log(experience);

    const experienceArr = experience.map((exp) => (
      <section className="experience" key={exp.id}>
        <label htmlFor={`exp-company-${exp.id}`}>Company:</label>
        <input
          type="text"
          placeholder="Google"
          data-id={exp.id}
          form="experience"
          id={`exp-company-${exp.id}`}
          name="companyName"
          value={exp.companyName}
          onChange={handleChange}
        />

        <label htmlFor={`exp-role-${exp.id}`}>Role:</label>
        <input
          type="text"
          placeholder="CEO"
          data-id={exp.id}
          form="experience"
          id={`exp-role-${exp.id}`}
          name="role"
          value={exp.role}
          onChange={handleChange}
        />

        <label htmlFor={`exp-from-${exp.id}`}>From:</label>
        <YearPicker
          dataId={exp.id}
          form="experience"
          id={`exp-from-${exp.id}`}
          name="fromDate"
          value={exp.fromDate}
          handleChange={handleChange}
        />

        <label htmlFor={`exp-to-${exp.id}`}>To:</label>
        <YearPicker
          dataId={exp.id}
          form="experience"
          id={`exp-to-${exp.id}`}
          name="toDate"
          value={exp.toDate}
          handleChange={handleChange}
        />

        <button
          type="button"
          data-id={exp.id}
          form="experience"
          onClick={deleteEntry}
        >
          Delete
        </button>
      </section>
    ));

    return (
      <section className="Form" id="experience-form">
        {experienceArr}
        <button
          type="button"
          id="add-experience-button"
          form="experience"
          onClick={addEntry}
        >
          Add Experience
        </button>
      </section>
    );
  }
}
