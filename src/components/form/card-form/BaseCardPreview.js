import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

class BaseCardPreview extends React.Component {
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
    this.deleteEntry = this.deleteEntry.bind(this);
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

  validateAndEditEntry(event) {
    const { editEntry, optionalFields } = this.props;

    const invalidInputs = Object.entries(this.state.inputValues).reduce(
      (acc, [key, value]) => {
        if (
          !optionalFields.includes(key) &&
          key !== "id" &&
          !value &&
          ((key !== "toDate" && key !== "inProgress") ||
            (key === "toDate" && !this.state.inputValues.inProgress))
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

    editEntry(event);
    this.initializeState();
  }

  deleteEntry(event) {
    this.props.deleteEntry(event);
  }

  render(renderInfo) {
    const { entry, formInputsComponent, cardInfo } = renderInfo;

    const editingForm = (
      <section className="form edit-entry-form">
        {formInputsComponent({
          ...this.props,
          handleChange: this.handleChange,
          inputValues: this.state.inputValues,
          invalidInputs: this.state.invalidInputs,
        })}

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
          data-wrapper={this.props.wrapper}
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
      <section
        className={`preview ${this.props.wrapper}-preview`}
        data-id={entry.id}
      >
        <header className="card-buttons-wrapper">
          <button
            className="edit-entry-button"
            type="button"
            title="Edit"
            data-wrapper={this.props.wrapper}
            data-id={entry.id}
            onClick={this.openForm}
          >
            <FaEdit style={{ pointerEvents: "none" }} />
          </button>
          <button
            className="delete-entry-button"
            type="button"
            title="Delete"
            data-wrapper={this.props.wrapper}
            data-id={entry.id}
            onClick={this.deleteEntry}
          >
            <FaTimes style={{ pointerEvents: "none" }} />
          </button>
        </header>

        {cardInfo}

        {this.state.formIsActive && editingForm}
      </section>
    );
  }
}

export default BaseCardPreview;
