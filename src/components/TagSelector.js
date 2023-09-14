import React from "react";
import Helpers from "../Helpers";
import TagSelectorTag from "./TagSelectorTag";
import TagSelectorInput from "./TagSelectorInput";
import { FaPlusCircle } from "react-icons/fa";

import "../styles/TagSelector.css";

export default class TagSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsActive: false,
      inputValues: {},
      invalidInputs: [],
    };

    this.openForm = this.openForm.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateAndAddEntry = this.validateAndAddEntry.bind(this);
  }

  initializeState() {
    const { inputsData } = this.props;

    const initialInputValues = {};
    inputsData.forEach((data) => {
      initialInputValues[data.input.attributes.name] = "";
    });

    this.setState({
      formIsActive: false,
      inputValues: initialInputValues,
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

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      inputValues: { ...prevState.inputValues, [name]: value },
      invalidInputs: prevState.invalidInputs.filter(
        (inputName) => inputName !== name
      ),
    }));
  }

  validateAndAddEntry(event) {
    const { addEntry, inputsData } = this.props;

    const requiredInputs = inputsData
      .filter((inputData) => inputData.input.data.required)
      .map((inputData) => inputData.input.attributes.name);

    const invalidInputs = requiredInputs.filter(
      (inputName) => !this.state.inputValues[inputName]
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
    const { title, wrapper, prevEntries, deleteEntry, inputsData } = this.props;

    const tagsArr = prevEntries.map((entry) => (
      <TagSelectorTag
        {...{ entry, inputsData, wrapper, deleteEntry }}
        key={entry.id}
      />
    ));

    const inputsArr = inputsData.map((inputData, index) => {
      const inputName = inputData.input.attributes.name;
      const value = this.state.inputValues[inputName];
      const isInvalid = this.state.invalidInputs.includes(inputName);
      inputData.input.attributes.value = value;
      inputData.input.data.isInvalid = isInvalid;

      return (
        <TagSelectorInput
          inputData={inputData}
          handleChange={this.handleChange}
          key={index}
        />
      );
    });

    const form = (
      <section className="tags-form">
        {inputsArr}

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
      <section
        className="tag-selector"
        id={`${Helpers.toKebabCase(wrapper)}-tag-selector`}
      >
        <header className="tag-selector-header">
          <section className="title">{title}</section>
          {!this.state.formIsActive && (
            <button
              type="button"
              className="add-tag-button"
              onClick={this.openForm}
              title="Add"
            >
              <FaPlusCircle />
            </button>
          )}
        </header>
        <section className="tags-container">{tagsArr}</section>
        {this.state.formIsActive && form}
      </section>
    );
  }
}
