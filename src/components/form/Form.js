import React from "react";
import OnlinePresenceInputs from "./OnlinePresenceInputs";
import TagSelector from "./tag-selector/TagSelector";
import formData from "../../data/formData";
import LocationSelector from "./location-selector/LocationSelector";
import PhotoInput from "./PhotoInput";
import CardForm from "./card-form/CardForm";
import "../../styles/form/Form.css";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false, doNotAskForConfirmation: false };
    this.dialogRef = React.createRef();
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    this.setState(
      { dialogOpen: true },
      () => this.dialogRef.current && this.dialogRef.current.showModal()
    );
  }

  closeDialog() {
    this.setState(
      { dialogOpen: false },
      () => this.dialogRef.current && this.dialogRef.current.close()
    );
  }

  render() {
    const {
      personalInfo,
      handleChange,
      updatePhoto,
      removePhoto,
      addEntry,
      editEntry,
      deleteEntry,
      loadExample,
      resetForm,
      toggleMode,
    } = this.props;

    const confirmationDialog = (
      <dialog ref={this.dialogRef}>
        <p>Are you sure you want to clear all fields?</p>
        <section className="input-wrapper checkbox">
          <label htmlFor="do-not-ask-again-checkbox">
            Don't show this message again
          </label>
          <input
            type="checkbox"
            id="do-not-ask-again-checkbox"
            checked={this.state.doNotAskForConfirmation}
            onChange={(event) =>
              this.setState({ doNotAskForConfirmation: event.target.checked })
            }
          />
        </section>

        <section className="dialog-buttons-wrapper">
          <button
            type="button"
            className="cancel-button"
            onClick={this.closeDialog}
          >
            Cancel
          </button>
          <button
            type="button"
            className="confirm-button"
            onClick={() => {
              resetForm();
              this.closeDialog();
            }}
          >
            Yes, clear all fields
          </button>
        </section>
      </dialog>
    );

    return (
      <section className="form-section">
        {this.state.dialogOpen && confirmationDialog}

        <header className="main-header">
          <section className="form-related-buttons-wrapper">
            <button
              type="button"
              id="load-example-button"
              onClick={loadExample}
            >
              Load Example
            </button>
            <button
              type="button"
              id="reset-form-button"
              onClick={
                this.state.doNotAskForConfirmation ? resetForm : this.openDialog
              }
            >
              Clear
            </button>
          </section>
          <button
            type="button"
            id="preview-mode-button"
            data-mode="preview"
            onClick={toggleMode}
          >
            Preview
          </button>
        </header>
        <form id="cv-form">
          <PhotoInput {...{ personalInfo, updatePhoto, removePhoto }} />

          <section className="input-wrapper">
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
          </section>

          <section className="input-wrapper">
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
          </section>

          <section className="input-wrapper">
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
          </section>

          <section className="input-wrapper">
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
            />
          </section>

          <section className="input-wrapper">
            <label htmlFor="description">Description:</label>
            <textarea
              placeholder="Junior Back-End Developer passionate about building efficient and scalable web applications.
                      With a strong foundation in programming languages and a keen eye for detail,I excel in writing clean and maintainable code."
              id="description"
              name="description"
              value={personalInfo.description}
              onChange={handleChange}
            ></textarea>
          </section>

          <section className="input-wrapper">
            <label htmlFor="phone">Phone number:</label>
            <input
              type="tel"
              placeholder="(+123) 12345678"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
            />
          </section>

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
                    dataList: formData.technicalSkills,
                    required: true,
                  },
                },
              },
            ]}
            prevEntries={personalInfo.technicalSkills}
            {...{ addEntry, deleteEntry }}
          />

          <CardForm
            wrapper="education"
            prevEntries={personalInfo.education}
            {...{ addEntry, editEntry, deleteEntry }}
          />

          <CardForm
            wrapper="experience"
            prevEntries={personalInfo.experience}
            {...{ addEntry, editEntry, deleteEntry }}
          />

          <CardForm
            wrapper="projects"
            prevEntries={personalInfo.projects}
            {...{ addEntry, editEntry, deleteEntry }}
          />

          <CardForm
            wrapper="references"
            prevEntries={personalInfo.references}
            {...{ addEntry, editEntry, deleteEntry }}
          />
        </form>
      </section>
    );
  }
}
