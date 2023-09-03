import React from "react";
import Helpers from "../Helpers";
import { FaEdit, FaTimes } from "react-icons/fa";
import BackgroundFormInputs from "./BackgroundFormInputs";

const getSplitDate = (date) => {
  const [year, month] = date.split("-");
  return { year, month };
};

export default class BackgroundFormPreview extends React.Component {
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
    console.log(this.props.entry);
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
    const { editEntry } = this.props;

    const invalidInputs = Object.entries(this.state.inputValues).reduce(
      (acc, [key, value]) => {
        if (
          key !== "id" &&
          ((key !== "toDate" && key !== "inProgress" && !value) ||
            (key === "toDate" && !value && !this.state.inputValues.inProgress))
        ) {
          acc.push(key);
        }
        return acc;
      },
      []
    );

    console.log(invalidInputs);

    if (invalidInputs.length) {
      this.setState((prevState) => ({
        invalidInputs: [...prevState.invalidInputs, ...invalidInputs],
      }));

      console.log("Invalid");
      console.log(invalidInputs.length);
      return;
    }

    editEntry(event);
    this.initializeState();
  }

  render() {
    console.log(this.props);

    const { entry, wrapper, inputOneName, inputTwoName, deleteEntry } =
      this.props;

    const fromDate = Helpers.monthInputSupported()
      ? Helpers.formatMonthInputDate({
          ...getSplitDate(entry.fromDate),
          monthFirst: true,
          twoDigitsYear: true,
        })
      : entry.fromDate;

    const toDate = entry.inProgress
      ? "Present"
      : Helpers.monthInputSupported()
      ? Helpers.formatMonthInputDate({
          ...getSplitDate(entry.toDate),
          monthFirst: true,
          twoDigitsYear: true,
        })
      : entry.toDate;

    const editingForm = (
      <section className="form edit-entry-form">
        <BackgroundFormInputs
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
          data-wrapper={wrapper}
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
      <section className={`preview ${wrapper}-preview`} data-id={entry.id}>
        <button
          className="delete-entry-button"
          type="button"
          title="Delete"
          data-wrapper={wrapper}
          data-id={entry.id}
          onClick={deleteEntry}
        >
          <FaTimes style={{ pointerEvents: "none" }} />
        </button>

        <button
          className="edit-entry-button"
          type="button"
          title="Edit"
          data-wrapper={wrapper}
          data-id={entry.id}
          onClick={this.openForm}
        >
          <FaEdit style={{ pointerEvents: "none" }} />
        </button>

        <p className={`${wrapper}-preview-info ${inputOneName}`}>
          {entry[inputOneName]}
        </p>

        <p className={`${wrapper}-preview-info ${inputTwoName}`}>
          {entry[inputTwoName]}
        </p>

        <p className={`${wrapper}-preview-info date`}>
          <span className="from">{fromDate}</span>
          <span className="separator">-</span>
          <span className="to">{toDate}</span>
        </p>

        {this.state.formIsActive && editingForm}
      </section>
    );
  }
}
