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
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  initializeInputsState() {
    const { inputsData } = this.props;
    const initialState = {};

    inputsData.forEach((data) => {
      initialState[data.input.attributes.name] = "";
    });

    this.setState({ inputValues: initialState });
  }

  componentDidMount() {
    this.initializeInputsState();
  }

  toggleForm() {
    this.setState((prevState) => ({ formIsActive: !prevState.formIsActive }));
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      inputValues: { ...prevState.inputValues, [name]: value },
    }));
  }

  render() {
    const { title, wrapper, prevEntries, addEntry, deleteEntry, inputsData } =
      this.props;

    const tagsArr = prevEntries.map((entry) => (
      <TagSelectorTag
        {...{ entry, inputsData, wrapper, deleteEntry }}
        key={entry.id}
      />
    ));

    const inputsArr = inputsData.map((inputData, index) => {
      const inputName = inputData.input.attributes.name;
      const value = this.state.inputValues[inputName];
      inputData.attributes = { ...inputData.attributes, value };

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
      <section
        className="tag-selector"
        id={`${Helpers.toKebabCase(wrapper)}-tag-selector`}
      >
        <header className="tag-selector-header">
          <section className="title">{title}</section>
          <button
            type="button"
            className="add-tag-button"
            onClick={this.toggleForm}
            title="Add"
          >
            <FaPlusCircle />
          </button>
        </header>
        <section className="tags-container">{tagsArr}</section>
        {this.state.formIsActive && form}
      </section>
    );
  }
}
