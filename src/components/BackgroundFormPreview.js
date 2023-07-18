import React from "react";
import Helpers from "../Helpers";

const getSplitDate = (date) => {
  const [year, month] = date.split("-");
  return { year, month };
};

export default class BackgroundFormPreview extends React.Component {
  render() {
    const { entry, wrapper, inputOneName, inputTwoName } = this.props;

    console.log(entry);

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

    return (
      <section className="preview" data-id={entry.id}>
        <section className={`${wrapper}-preview`}>
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
        </section>
      </section>
    );
  }
}
