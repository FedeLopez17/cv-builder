import React from "react";
import BackgroundPreview from "./BackgroundPreview";
import BackgroundFormInputs from "./BackgroundFormInputs";
import ProjectPreview from "./ProjectPreview";
import ProjectFormInputs from "./ProjectFormInputs";
import { FaPlusCircle } from "react-icons/fa";
import ReferencePreview from "./ReferencePreview";
import ReferenceFormInputs from "./ReferenceFormInputs";
import Helpers from "../../../Helpers";
import "../../../styles/form/CardForm.css";

const ALLOWED_WRAPPERS = ["education", "experience", "projects", "references"];

const OPTIONAL_FIELDS = {
  education: ["description"],
  experience: ["description"],
  projects: ["description", "website", "repository"],
  references: ["phone"],
};

export default class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsActive: false,
      inputValues: {},
      invalidInputs: [],
    };

    this.initializeState = this.initializeState.bind(this);
    this.openForm = this.openForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateAndAddEntry = this.validateAndAddEntry.bind(this);
  }

  initializeState() {
    const { wrapper } = this.props;

    if (!ALLOWED_WRAPPERS.includes(wrapper)) {
      throw new Error("Invalid wrapper prop");
    }

    const initialStateOptions = {
      education: {
        description: "",
        fromDate: "",
        toDate: "",
        inProgress: false,
        institution: "",
        degree: "",
      },

      experience: {
        description: "",
        fromDate: "",
        toDate: "",
        inProgress: false,
        company: "",
        role: "",
      },

      projects: {
        name: "",
        description: "",
        fromDate: "",
        toDate: "",
        website: "",
        repository: "",
      },

      references: {
        name: "",
        lastName: "",
        role: "",
        company: "",
        phone: "",
        email: "",
      },
    };

    const initialValues = initialStateOptions[wrapper];

    this.setState({
      formIsActive: false,
      inputValues: initialValues,
      invalidInputs: [],
    });
  }

  componentDidMount() {
    this.initializeState();
  }

  openForm() {
    if (!this.state.formIsActive) {
      this.setState({ formIsActive: true });
    }
  }

  handleChange({ target: { name, type, value, checked } }) {
    const isCheckbox = type === "checkbox";

    this.setState((prevState) => ({
      inputValues: {
        ...prevState.inputValues,
        [name]: isCheckbox ? checked : value,
      },
      invalidInputs: prevState.invalidInputs.filter(
        (inputName) => inputName !== (name === "inProgress" ? "toDate" : name)
      ),
    }));
  }

  validateAndAddEntry(event) {
    const { addEntry, wrapper } = this.props;

    const invalidInputs = Object.entries(this.state.inputValues).reduce(
      (acc, [key, value]) => {
        if (
          !value &&
          (((wrapper === "education" || wrapper === "experience") &&
            !OPTIONAL_FIELDS[wrapper].includes(key) &&
            ((key !== "toDate" && key !== "inProgress") ||
              (key === "toDate" && !this.state.inputValues.inProgress))) ||
            (wrapper === "projects" &&
              !OPTIONAL_FIELDS.projects.includes(key)) ||
            (wrapper === "references" &&
              !OPTIONAL_FIELDS.references.includes(key)))
        ) {
          acc.push(key);
        }
        return acc;
      },
      []
    );

    if (invalidInputs.length) {
      this.setState((prevState) => ({
        invalidInputs: [...prevState.invalidInputs, ...invalidInputs],
      }));

      return;
    }

    addEntry(event);
    this.initializeState();
  }

  render() {
    const { wrapper, prevEntries, editEntry, deleteEntry } = this.props;

    const childrenPropsInCommon = {
      wrapper,
      inputValues: this.state.inputValues,
      invalidInputs: this.state.invalidInputs,
      handleChange: this.handleChange,
    };

    let inputOneName =
      wrapper === "education"
        ? "degree"
        : wrapper === "experience"
        ? "role"
        : undefined;
    let inputTwoName =
      wrapper === "education"
        ? "institution"
        : wrapper === "experience"
        ? "company"
        : undefined;

    const prevEntriesArr = prevEntries.map((entry) => {
      if (wrapper === "education" || wrapper === "experience") {
        return (
          <BackgroundPreview
            {...{
              ...childrenPropsInCommon,
              entry,
              editEntry,
              deleteEntry,
              wrapper,
              inputOneName,
              inputTwoName,
              optionalFields: OPTIONAL_FIELDS[wrapper],
              key: entry.id,
            }}
          />
        );
      } else if (wrapper === "projects") {
        return (
          <ProjectPreview
            {...{
              childrenPropsInCommon,
              entry,
              editEntry,
              deleteEntry,
              wrapper,
              optionalFields: OPTIONAL_FIELDS.projects,
              key: entry.id,
            }}
          />
        );
      } else {
        return (
          <ReferencePreview
            {...{
              childrenPropsInCommon,
              entry,
              editEntry,
              deleteEntry,
              wrapper,
              optionalFields: OPTIONAL_FIELDS.references,
              key: entry.id,
            }}
          />
        );
      }
    });

    const form = (
      <section className="form add-entry-form">
        {((wrapper === "education" || wrapper === "experience") && (
          <BackgroundFormInputs
            {...{
              ...childrenPropsInCommon,
              inputOneName,
              inputTwoName,
            }}
          />
        )) ||
          (wrapper === "projects" && (
            <ProjectFormInputs {...childrenPropsInCommon} />
          )) ||
          (wrapper === "references" && (
            <ReferenceFormInputs {...childrenPropsInCommon} />
          ))}

        <section className="card-form-buttons-wrapper">
          <button
            type="button"
            className="cancel-entry-button"
            onClick={this.initializeState}
          >
            Cancel
          </button>
          <button
            type="button"
            data-wrapper={wrapper}
            data-entry={JSON.stringify(this.state.inputValues)}
            className="add-entry-button"
            onClick={this.validateAndAddEntry}
          >
            Add Entry
          </button>
        </section>
      </section>
    );

    return (
      <section className="card-form" id={`${wrapper}-form`}>
        <header className="card-form-header">
          <section className="title">{Helpers.capitalize(wrapper)}</section>
          {!this.state.formIsActive && (
            <button
              type="button"
              className="add-card-entry-button"
              onClick={this.openForm}
              title="Add"
            >
              <FaPlusCircle />
            </button>
          )}
        </header>
        <section className={`card-container ${wrapper}-container`}>
          {prevEntriesArr}
        </section>
        {this.state.formIsActive && form}
      </section>
    );
  }
}
