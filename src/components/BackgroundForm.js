import React from "react";
import BackgroundFormPreview from "./BackgroundFormPreview";
import BackgroundFormInputs from "./BackgroundFormInputs";

import "../styles/BackgroundForm.css";
import { FaPlusCircle } from "react-icons/fa";

export default class BackgroundForm extends React.Component {
  constructor() {
    super();
    this.state = {
      formIsActive: false,
      inputValues: {},
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  initializeInputsState() {
    const { isEducation } = this.props;

    const initialState = {
      fromDate: "",
      toDate: "",
      inProgress: false,
      ...(isEducation
        ? { institution: "", degree: "" }
        : { company: "", role: "" }),
    };

    this.setState({ inputValues: initialState });
  }

  componentDidMount() {
    this.initializeInputsState();
  }

  toggleForm() {
    this.setState((prevState) => ({ formIsActive: !prevState.formIsActive }));
  }

  handleChange({ target: { name, type, value, checked } }) {
    const isCheckbox = type === "checkbox";

    this.setState((prevState) => ({
      inputValues: {
        ...prevState.inputValues,
        [name]: isCheckbox ? checked : value,
      },
    }));
  }

  render() {
    const { isEducation, prevEntries, addEntry } = this.props;
    const wrapper = isEducation ? "education" : "experience";

    const inputOneName = isEducation ? "degree" : "role";
    const inputTwoName = isEducation ? "institution" : "company";

    const prevEntriesArr = prevEntries.map((entry) => (
      <BackgroundFormPreview
        {...{ entry, wrapper, inputOneName, inputTwoName }}
        key={entry.id}
      />
    ));

    const form = (
      <section className="form">
        <BackgroundFormInputs
          {...{ wrapper, inputOneName, inputTwoName, isEducation }}
          inputValues={this.state.inputValues}
          handleChange={this.handleChange}
        />

        <button
          type="button"
          className="cancel-entry-button"
          onClick={this.toggleForm}
        >
          Cancel
        </button>

        <button
          type="button"
          data-wrapper={wrapper}
          data-entry={JSON.stringify(this.state.inputValues)}
          className="add-entry-button"
          onClick={addEntry}
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
            onClick={this.toggleForm}
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
