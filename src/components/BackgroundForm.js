import React from "react";
import BackgroundFormPreview from "./BackgroundFormPreview";
import BackgroundFormInputs from "./BackgroundFormInputs";

import "../styles/BackgroundForm.css";
import { FaPlusCircle } from "react-icons/fa";

export default class BackgroundForm extends React.Component {
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
    const { isEducation } = this.props;

    const initialValues = {
      fromDate: "",
      toDate: "",
      inProgress: false,
      ...(isEducation
        ? { institution: "", degree: "" }
        : { company: "", role: "" }),
    };

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
    const { addEntry } = this.props;

    const invalidInputs = Object.entries(this.state.inputValues).reduce(
      (acc, [key, value]) => {
        if (
          (key !== "toDate" && key !== "inProgress" && !value) ||
          (key === "toDate" && !value && !this.state.inputValues.inProgress)
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
    const { isEducation, prevEntries, editEntry, deleteEntry } = this.props;
    const wrapper = isEducation ? "education" : "experience";

    const inputOneName = isEducation ? "degree" : "role";
    const inputTwoName = isEducation ? "institution" : "company";

    const childrenComponentProps = {
      wrapper,
      inputOneName,
      inputTwoName,
      isEducation,
      editEntry,
      deleteEntry,
      inputValues: this.state.inputValues,
      invalidInputs: this.state.invalidInputs,
      handleChange: this.handleChange,
    };

    const prevEntriesArr = prevEntries.map((entry) => (
      <BackgroundFormPreview
        {...{ ...childrenComponentProps, entry }}
        key={entry.id}
      />
    ));

    const form = (
      <section className="form add-entry-form">
        <BackgroundFormInputs {...childrenComponentProps} />

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
    );

    return (
      <section className="background-form" id={`${wrapper}-form`}>
        <header className="background-form-header">
          <section className="title">
            {isEducation ? "Education" : "Experience"}
          </section>
          <button
            type="button"
            className="add-background-entry-button"
            onClick={this.openForm}
            title="Add"
          >
            <FaPlusCircle />
          </button>
        </header>
        <section className={`background-container ${wrapper}-container`}>
          {prevEntriesArr}
        </section>
        {this.state.formIsActive && form}
      </section>
    );
  }
}
