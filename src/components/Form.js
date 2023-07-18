import React from "react";
import "../styles/Form.css";
import OnlinePresenceInputs from "./OnlinePresenceInputs";
import TagSelector from "./TagSelector";
import data from "../data";
import BackgroundForm from "./BackgroundForm";

export default class Form extends React.Component {
  render() {
    const { personalInfo, handleChange, addEntry, deleteEntry } = this.props;

    return (
      <form className="Form" id="forms-container">
        <label htmlFor="first-name">First name:</label>
        <input
          type="text"
          placeholder="John"
          id="first-name"
          name="firstName"
          value={personalInfo.firstName}
          autoCapitalize="on"
          onChange={handleChange}
        />

        <label htmlFor="last-name">Last name:</label>
        <input
          type="text"
          placeholder="Doe"
          id="last-name"
          name="lastName"
          value={personalInfo.lastName}
          autoCapitalize="on"
          onChange={handleChange}
        />

        <label htmlFor="role">Role:</label>
        <input
          type="text"
          placeholder="Junior Back-End Developer"
          list="roles-list"
          id="role"
          name="role"
          value={personalInfo.role}
          autoComplete="off"
          onChange={handleChange}
        />
        <datalist id="roles-list">
          {data.roles.map((ele, index) => (
            <option value={ele} key={index} />
          ))}
        </datalist>

        <label htmlFor="description">Description:</label>
        <textarea
          placeholder="Junior Back-End Developer passionate about building efficient and scalable web applications.
                  With a strong foundation in programming languages and a keen eye for detail,I excel in writing clean and maintainable code."
          id="description"
          name="description"
          value={personalInfo.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="email">E-Mail:</label>
        <input
          type="email"
          placeholder="john.doe@example.com"
          id="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone number:</label>
        <input
          type="tel"
          placeholder="(+123) 12345678"
          id="phone"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
        />

        <OnlinePresenceInputs
          personalInfo={personalInfo}
          handleChange={handleChange}
        />

        <TagSelector
          title="Hobbies"
          wrapper="hobbies"
          inputsData={[
            {
              label: { text: "Hobby", for: "hobby-input" },
              input: {
                type: "text",
                placeholder: "Reading",
                dataList: { data: data.hobbies, id: "hobbies-data-list" },
                name: "hobby",
                id: "hobby-input",
                showInTag: true,
              },
            },
          ]}
          prevEntries={personalInfo.hobbies}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

        <TagSelector
          title="Languages"
          wrapper="languages"
          inputsData={[
            {
              label: { text: "Language", for: "language-input" },
              input: {
                type: "text",
                placeholder: "English",
                dataList: {
                  data: data.languages.languages,
                  id: "languages-languages-data-list",
                },
                name: "language",
                id: "languages-language-input",
                showInTag: true,
              },
            },
            {
              label: { text: "Level", for: "languages-level-input" },
              input: {
                type: "text",
                placeholder: "Level",
                dataList: {
                  data: data.languages.levels,
                  id: "languages-levels-data-list",
                },
                name: "level",
                id: "languages-level-input",
                showInTag: true,
              },
            },
          ]}
          prevEntries={personalInfo.languages}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

        <TagSelector
          title="Soft Skills"
          wrapper="softSkills"
          inputsData={[
            {
              label: { text: "Skill", for: "soft-skill-input" },
              input: {
                type: "text",
                placeholder: "Communication",
                dataList: {
                  data: data.softSkills,
                  id: "soft-skills-data-list",
                },
                name: "skill",
                id: "soft-skill-input",
                showInTag: true,
              },
            },
          ]}
          prevEntries={personalInfo.softSkills}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

        <TagSelector
          title="Technical Skills"
          wrapper="technicalSkills"
          inputsData={[
            {
              label: { text: "Skill", for: "technical-skill-input" },
              input: {
                type: "text",
                placeholder: "Git",
                dataList: {
                  data: data.softSkills,
                  id: "technical-skills-data-list",
                },
                name: "skill",
                id: "technical-skill-input",
                showInTag: true,
              },
            },
          ]}
          prevEntries={personalInfo.technicalSkills}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

        <TagSelector
          title="Professional References"
          wrapper="references"
          inputsData={[
            {
              label: { text: "Name", for: "reference-name-input" },
              input: {
                type: "text",
                placeholder: "Jason",
                name: "name",
                id: "reference-name-input",
                showInTag: true,
              },
            },
            {
              label: { text: "Last Name", for: "reference-last-name-input" },
              input: {
                type: "text",
                placeholder: "Smith",
                name: "lastName",
                id: "reference-last-name-input",
                showInTag: true,
              },
            },
            {
              label: { text: "Role", for: "reference-role-input" },
              input: {
                type: "text",
                placeholder: "CEO",
                dataList: { data: data.roles, id: "roles-data-list" },
                name: "role",
                id: "reference-role-input",
                showInTag: false,
              },
            },
            {
              label: { text: "Company", for: "reference-company-input" },
              input: {
                type: "text",
                placeholder: "Google",
                name: "company",
                id: "reference-company-input",
                showInTag: true,
              },
            },
            {
              label: { text: "Phone", for: "reference-phone-input" },
              input: {
                type: "tel",
                placeholder: "1234567",
                name: "phone",
                id: "reference-phone-input",
                showInTag: false,
              },
            },
            {
              label: { text: "Email", for: "reference-email-input" },
              input: {
                type: "email",
                placeholder: "reference@example.com",
                name: "email",
                id: "reference-email-input",
                showInTag: false,
              },
            },
          ]}
          prevEntries={personalInfo.references}
          addEntry={addEntry}
          deleteEntry={deleteEntry}
        />

        <BackgroundForm
          isEducation={true}
          prevEntries={personalInfo.education}
          addEntry={addEntry}
        />

        <BackgroundForm
          isEducation={false}
          prevEntries={personalInfo.experience}
          addEntry={addEntry}
        />
      </form>
    );
  }
}
