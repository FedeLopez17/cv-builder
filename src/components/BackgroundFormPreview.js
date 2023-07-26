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

    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const inputValues = this.props.inputValues;
    this.setState({ inputValues });
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
    const {
      entry,
      wrapper,
      inputOneName,
      inputTwoName,
      deleteEntry,
      editEntry,
    } = this.props;

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
          }}
        />

        <button
          type="button"
          className="cancel-editing-button"
          onClick={this.toggleForm}
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
          onClick={editEntry}
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
          onClick={this.toggleForm}
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
