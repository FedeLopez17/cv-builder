import React from "react";
import "./styles/App.css";
import Form from "./components/Form";
import ModeToggle from "./components/ModeToggle";
import Preview from "./components/Preview";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isEditMode: true,
      personalInfo: {
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
      },
    };

    this.toggleMode = this.toggleMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

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

  addEntry(event) {
    const wrapper = event.target.getAttribute("data-wrapper");
    const entry = JSON.parse(event.target.getAttribute("data-entry"));

    this.setState((prevState) => {
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
    });
  }

  deleteEntry(event) {
    const wrapper = event.target.getAttribute("data-wrapper");
    const deletionId = event.target.getAttribute("data-id");

    this.setState((prevState) => ({
      personalInfo: {
        ...prevState.personalInfo,
        [wrapper]: prevState.personalInfo[wrapper].filter(
          (entry) => entry.id !== parseInt(deletionId)
        ),
      },
    }));
  }

  render() {
    const form = (
      <Form
        personalInfo={this.state.personalInfo}
        handleChange={this.handleChange}
        addEntry={this.addEntry}
        deleteEntry={this.deleteEntry}
      />
    );

    const preview = <Preview personalInfo={this.state.personalInfo} />;

    return (
      <div className="app">
        <ModeToggle
          handleClick={this.toggleMode}
          isEditMode={this.state.isEditMode}
        />
        {this.state.isEditMode ? form : preview}
      </div>
    );
  }
}
