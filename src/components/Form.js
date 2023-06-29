import React from "react";
import PersonalInfoForm from "./PersonalInfoForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import "../styles/Form.css";

export default class Form extends React.Component {
  render() {
    const {
      personalInfo,
      experience,
      education,
      handleChange,
      addEntry,
      deleteEntry,
    } = this.props;

    return (
      <section className="Form">
        <PersonalInfoForm
          personalInfo={personalInfo}
          handleChange={handleChange}
        />
        <ExperienceForm
          experience={experience}
          handleChange={handleChange}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />
        <EducationForm
          education={education}
          handleChange={handleChange}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />
      </section>
    );
  }
}
