import React from "react";
import Helpers from "../../../Helpers";
import BasePreview from "./BaseCardPreview";
import BackgroundFormInputs from "./BackgroundFormInputs";

export default class BackgroundPreview extends BasePreview {
  render() {
    const { entry, inputOneName, inputTwoName } = this.props;

    const fromDate = Helpers.monthInputSupported()
      ? Helpers.formatMonthInputDate({
          ...Helpers.getSplitDate(entry.fromDate),
          monthFirst: true,
          twoDigitsYear: true,
        })
      : entry.fromDate;

    const toDate = entry.inProgress
      ? "Present"
      : Helpers.monthInputSupported()
      ? Helpers.formatMonthInputDate({
          ...Helpers.getSplitDate(entry.toDate),
          monthFirst: true,
          twoDigitsYear: true,
        })
      : entry.toDate;

    return super.render({
      entry,
      formInputsComponent: (props) => <BackgroundFormInputs {...props} />,
      cardInfo: (
        <>
          <p className={`${this.props.wrapper}-preview-info ${inputOneName}`}>
            {entry[inputOneName]}
          </p>

          <p className={`${this.props.wrapper}-preview-info ${inputTwoName}`}>
            {entry[inputTwoName]}
          </p>

          <p className={`${this.props.wrapper}-preview-info date`}>
            <span className="from">{fromDate}</span>
            <span className="separator">-</span>
            <span className="to">{toDate}</span>
          </p>
        </>
      ),
    });
  }
}
