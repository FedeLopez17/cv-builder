import React from "react";
import "../styles/Form.css";
import OnlinePresenceInputs from "./OnlinePresenceInputs";
import TagSelector from "./TagSelector";
import formData from "../data/formData";
import BackgroundForm from "./BackgroundForm";
import LocationSelector from "./LocationSelector";
import PhotoInput from "./PhotoInput";

export default class Form extends React.Component {
  render() {
    const {
      personalInfo,
      handleChange,
      updatePhoto,
      removePhoto,
      addEntry,
      editEntry,
      deleteEntry,
    } = this.props;

    return (
      <form className="Form" id="forms-container">
        <PhotoInput {...{ personalInfo, updatePhoto, removePhoto }} />

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
          {formData.roles.map((ele, index) => (
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

        <LocationSelector
          location={personalInfo.location}
          handleChange={handleChange}
        />

        <OnlinePresenceInputs {...{ personalInfo, handleChange }} />

        <TagSelector
          title="Hobbies"
          wrapper="hobbies"
          inputsData={[
            {
              labelText: "Hobby:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Reading",
                  list: "hobbies-data-list",
                  name: "hobby",
                  id: "hobby-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.hobbies,
                  required: true,
                },
              },
            },
          ]}
          prevEntries={personalInfo.hobbies}
          {...{ addEntry, deleteEntry }}
        />

        <TagSelector
          title="Languages"
          wrapper="languages"
          inputsData={[
            {
              labelText: "Language:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "English",
                  list: "languages-languages-data-list",
                  name: "language",
                  id: "languages-language-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.languages.languages,
                  required: true,
                },
              },
            },
            {
              labelText: "Level:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Level",
                  list: "languages-levels-data-list",
                  name: "level",
                  id: "languages-level-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.languages.levels,
                },
              },
            },
          ]}
          prevEntries={personalInfo.languages}
          {...{ addEntry, deleteEntry }}
        />

        <TagSelector
          title="Soft Skills"
          wrapper="softSkills"
          inputsData={[
            {
              labelText: "Skill:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Communication",
                  list: "soft-skills-data-list",
                  name: "skill",
                  id: "soft-skill-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.softSkills,
                  required: true,
                },
              },
            },
          ]}
          prevEntries={personalInfo.softSkills}
          {...{ addEntry, deleteEntry }}
        />

        <TagSelector
          title="Technical Skills"
          wrapper="technicalSkills"
          inputsData={[
            {
              labelText: "Skill:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Git",
                  list: "technical-skills-data-list",
                  name: "skill",
                  id: "technical-skill-input",
                },
                data: {
                  showInTag: true,
                  dataList: formData.softSkills,
                  required: true,
                },
              },
            },
          ]}
          prevEntries={personalInfo.technicalSkills}
          {...{ addEntry, deleteEntry }}
        />

        <TagSelector
          title="Professional References"
          wrapper="references"
          inputsData={[
            {
              labelText: "Name:",
              input: {
                attributes: {
                  type: "text",
                  autoCapitalize: "words",
                  placeholder: "Jason",
                  name: "name",
                  id: "reference-name-input",
                },
                data: { showInTag: true, required: true },
              },
            },
            {
              labelText: "Last Name:",
              input: {
                attributes: {
                  type: "text",
                  autoCapitalize: "words",
                  placeholder: "Smith",
                  name: "lastName",
                  id: "reference-last-name-input",
                },
                data: { showInTag: true, required: true },
              },
            },
            {
              labelText: "Role:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "CEO",
                  list: "roles-data-list",
                  name: "role",
                  id: "reference-role-input",
                },
                data: {
                  showInTag: false,
                  dataList: formData.roles,
                  required: true,
                },
              },
            },
            {
              labelText: "Company:",
              input: {
                attributes: {
                  type: "text",
                  placeholder: "Google",
                  name: "company",
                  id: "reference-company-input",
                },
                data: { showInTag: true, required: true },
              },
            },
            {
              labelText: "Phone:",
              input: {
                attributes: {
                  type: "tel",
                  placeholder: "1234567",
                  name: "phone",
                  id: "reference-phone-input",
                },
                data: { showInTag: false, required: false },
              },
            },
            {
              labelText: "Email:",
              input: {
                attributes: {
                  type: "email",
                  placeholder: "reference@example.com",
                  name: "email",
                  id: "reference-email-input",
                },
                data: { showInTag: false, required: true },
              },
            },
          ]}
          prevEntries={personalInfo.references}
          {...{ addEntry, deleteEntry }}
        />

        <BackgroundForm
          isEducation={true}
          prevEntries={personalInfo.education}
          {...{ addEntry, editEntry, deleteEntry }}
        />

        <BackgroundForm
          isEducation={false}
          prevEntries={personalInfo.experience}
          {...{ addEntry, editEntry, deleteEntry }}
        />
      </form>
    );
  }
}
