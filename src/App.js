import React from "react";
import Form from "./components/form/Form";
import Preview from "./components/preview/Preview";
import example from "./data/formExample";
import "./styles/App.css";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isEditMode: true,
      personalInfo: this.initialPersonalInfo,
    };

    this.toggleMode = this.toggleMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updatePhoto = this.updatePhoto.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.loadExample = this.loadExample.bind(this);
  }

  initialPersonalInfo = {
    photo: "",
    firstName: "",
    lastName: "",
    role: "",
    description: "",
    location: {
      country: "",
      region: "",
      city: "",
      postalCode: "",
      address: "",
    },
    phone: "",
    email: "",
    website: { domain: "", url: "", redirect: false },
    linkedin: { userName: "", url: "", redirect: false },
    github: { userName: "", url: "", redirect: false },
    gitlab: { userName: "", url: "", redirect: false },
    instagram: { userName: "", url: "", redirect: false },
    twitter: { userName: "", url: "", redirect: false },
    facebook: { userName: "", url: "", redirect: false },
    stackOverflow: { userName: "", url: "", redirect: false },
    behance: { userName: "", url: "", redirect: false },
    dribbble: { userName: "", url: "", redirect: false },
    medium: { userName: "", url: "", redirect: false },
    youtube: { userName: "", url: "", redirect: false },
    vimeo: { userName: "", url: "", redirect: false },
    tiktok: { userName: "", url: "", redirect: false },
    languages: [],
    softSkills: [],
    technicalSkills: [],
    hobbies: [],
    references: [],
    experience: [],
    education: [],
    projects: [],
  };

  toggleMode(event) {
    const mode = event.target.getAttribute("data-mode");
    this.setState({
      isEditMode: mode === "edit",
    });
  }

  handleChange(event) {
    const { name, type, value, checked } = event.target;
    const id = event.target.getAttribute("data-id");
    const wrapper = event.target.getAttribute("data-wrapper");
    const wrapperState = wrapper ? this.state.personalInfo[wrapper] : false;
    const wrapperIsArr = Array.isArray(wrapperState);

    this.setState((prevState) => {
      let updatedState;

      if (wrapper) {
        updatedState = {
          personalInfo: {
            ...prevState.personalInfo,
            [wrapper]: wrapperIsArr
              ? wrapperState.map((ele) =>
                  ele.id === parseInt(id) ? { ...ele, [name]: value } : ele
                )
              : {
                  ...wrapperState,
                  [name]: type === "checkbox" ? checked : value,
                },
          },
        };
      } else {
        updatedState = {
          personalInfo: {
            ...prevState.personalInfo,
            [name]: value,
          },
        };
      }

      return updatedState;
    });
  }

  updatePhoto(photo) {
    this.setState((prevState) => ({
      personalInfo: { ...prevState.personalInfo, photo },
    }));
  }

  removePhoto() {
    this.setState((prevState) => ({
      personalInfo: { ...prevState.personalInfo, photo: "" },
    }));
  }

  addEntry(event) {
    const wrapper = event.target.getAttribute("data-wrapper");
    const entry = JSON.parse(event.target.getAttribute("data-entry"));

    this.setState(
      (prevState) => {
        const entries = prevState.personalInfo[wrapper];
        const newEntry = {
          ...entry,
          id: entries.length ? entries[entries.length - 1].id + 1 : 0,
        };

        return {
          personalInfo: {
            ...prevState.personalInfo,
            [wrapper]: [...prevState.personalInfo[wrapper], newEntry],
          },
        };
      },
      () => {
        console.log(this.state.personalInfo);
      }
    );
  }

  editEntry(event) {
    const wrapper = event.target.getAttribute("data-wrapper");
    const editedEntry = JSON.parse(event.target.getAttribute("data-entry"));

    this.setState((prevState) => {
      const updatedEntries = prevState.personalInfo[wrapper].map((entry) =>
        entry.id === editedEntry.id ? editedEntry : entry
      );

      return {
        personalInfo: {
          ...prevState.personalInfo,
          [wrapper]: updatedEntries,
        },
      };
    });
  }

  deleteEntry(event) {
    const wrapper = event.target.getAttribute("data-wrapper");
    const deletionId = event.target.getAttribute("data-id");

    console.log(wrapper);
    console.log(deletionId);

    this.setState((prevState) => ({
      personalInfo: {
        ...prevState.personalInfo,
        [wrapper]: prevState.personalInfo[wrapper].filter(
          (entry) => entry.id !== parseInt(deletionId)
        ),
      },
    }));
  }

  resetForm() {
    this.setState({ personalInfo: this.initialPersonalInfo });
  }

  loadExample() {
    this.setState({ personalInfo: example });
  }

  render() {
    const form = (
      <Form
        personalInfo={this.state.personalInfo}
        handleChange={this.handleChange}
        updatePhoto={this.updatePhoto}
        removePhoto={this.removePhoto}
        addEntry={this.addEntry}
        editEntry={this.editEntry}
        deleteEntry={this.deleteEntry}
        resetForm={this.resetForm}
        loadExample={this.loadExample}
        toggleMode={this.toggleMode}
      />
    );

    const preview = (
      <Preview
        personalInfo={this.state.personalInfo}
        toggleMode={this.toggleMode}
      />
    );

    return <div className="app">{this.state.isEditMode ? form : preview}</div>;
  }
}
