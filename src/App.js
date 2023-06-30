import React from "react";
import "./styles/App.css";
import Form from "./components/Form";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      personalInfo: {
        firstName: "",
        lastName: "",
        role: "",
        description: "",
        location: "",
        phone: "",
        email: "",
      },
      experience: [],
      education: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addEntry = this.addEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const form = event.target.getAttribute("form");
    const id = event.target.getAttribute("data-id");

    let newState;

    if (Array.isArray(this.state[form])) {
      newState = {
        [form]: this.state[form].map((element) =>
          element.id === parseInt(id) ? { ...element, [name]: value } : element
        ),
      };
    } else {
      newState = {
        [form]: {
          ...this.state[form],
          [name]: value,
        },
      };
    }

    this.setState(newState);
  }

  addEntry(event) {
    const form = event.target.getAttribute("form");
    const isEdu = form === "education";

    this.setState({
      [form]: [
        ...this.state[form],
        {
          [(isEdu && "institutionName") || "companyName"]: "",
          [(isEdu && "degree") || "role"]: "",
          id:
            (this.state[form].length &&
              this.state[form].slice(-1).pop().id + 1) ||
            0,
          fromDate: new Date().getFullYear() - 3,
          toDate: new Date().getFullYear(),
        },
      ],
    });
  }

  deleteEntry(event) {
    const form = event.target.getAttribute("form");
    const id = event.target.getAttribute("data-id");

    this.setState({
      [form]: this.state[form].filter((element) => element.id !== parseInt(id)),
    });
  }

  render() {
    return (
      <div className="App">
        <Form
          personalInfo={this.state.personalInfo}
          experience={this.state.experience}
          education={this.state.education}
          handleChange={this.handleChange}
          addEntry={this.addEntry}
          deleteEntry={this.deleteEntry}
        />
      </div>
    );
  }
}
