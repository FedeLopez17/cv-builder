import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import ReferenceFormInputs from "./ReferenceFormInputs";

export default class ReferenceFormPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsActive: false,
      inputValues: {},
    };

    this.openForm = this.openForm.bind(this);
    this.initializeState = this.initializeState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateAndEditEntry = this.validateAndEditEntry.bind(this);
  }

  initializeState() {
    this.setState({
      formIsActive: false,
      inputValues: this.props.entry,
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
      inputValues: {
        ...prevState.inputValues,
        [name]: value,
      },
      invalidInputs: prevState.invalidInputs.filter(
        (inputName) => inputName !== name
      ),
    }));
  }

  validateAndEditEntry(event) {
    const { editEntry, optionalFields } = this.props;

    const invalidInputs = Object.entries(this.state.inputValues).reduce(
      (acc, [key, value]) => {
        if (key !== "id" && !optionalFields.includes(key) && !value) {
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

    editEntry(event);
    this.initializeState();
  }

  render() {
    const { entry, deleteEntry } = this.props;

    const editingForm = (
      <section className="form edit-entry-form">
        <ReferenceFormInputs
          {...{
            ...this.props,
            handleChange: this.handleChange,
            inputValues: this.state.inputValues,
            invalidInputs: this.state.invalidInputs,
          }}
        />

        <button
          type="button"
          className="cancel-editing-button"
          onClick={this.initializeState}
        >
          Cancel
        </button>

        <button
          type="button"
          title="Apply"
          data-wrapper="references"
          data-id={entry.id}
          data-entry={JSON.stringify({
            ...this.state.inputValues,
            id: entry.id,
          })}
          className="apply-editing-button"
          onClick={this.validateAndEditEntry}
        >
          Apply
        </button>
      </section>
    );

    return (
      <section className="preview reference-preview" data-id={entry.id}>
        <button
          className="edit-entry-button"
          type="button"
          title="Edit"
          data-wrapper="references"
          data-id={entry.id}
          onClick={this.openForm}
        >
          <FaEdit style={{ pointerEvents: "none" }} />
        </button>

        <button
          className="delete-entry-button"
          type="button"
          title="Delete"
          data-wrapper="references"
          data-id={entry.id}
          onClick={deleteEntry}
        >
          <FaTimes style={{ pointerEvents: "none" }} />
        </button>

        <p className="reference-preview-full-name">
          {entry.name} {entry.lastName}
        </p>
        <p className="reference-preview-role">{entry.role}</p>
        <p className="reference-preview-company">{entry.company}</p>

        {this.state.formIsActive && editingForm}
      </section>
    );
  }
}
