import React from "react";
import YearPicker from "./YearPicker";

export default class ExperienceForm extends React.Component {
  render() {
    const { experience, handleChange, addEntry, deleteEntry } = this.props;

    console.log(experience);

    const experienceArr = experience.map((exp) => (
      <section className="experience" key={exp.id}>
        <label>
          Company:
          <input
            type="text"
            placeholder="Google"
            data-id={exp.id}
            form="experience"
            name="companyName"
            value={exp.companyName}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            placeholder="CEO"
            data-id={exp.id}
            form="experience"
            name="role"
            value={exp.role}
            onChange={handleChange}
          />
        </label>
        <label>
          From:
          <YearPicker
            id={exp.id}
            form="experience"
            name="fromDate"
            value={exp.fromDate}
            handleChange={handleChange}
          />
        </label>
        <label>
          To:
          <YearPicker
            id={exp.id}
            form="experience"
            name="toDate"
            value={exp.toDate}
            handleChange={handleChange}
          />
        </label>
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
