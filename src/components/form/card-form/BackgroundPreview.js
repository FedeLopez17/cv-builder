import React from "react";
import BasePreview from "./BaseCardPreview";
import BackgroundFormInputs from "./BackgroundFormInputs";

export default class BackgroundPreview extends BasePreview {
  constructor(props) {
    super(props);
    this.getFromDate = this.getFromDate.bind(this);
    this.getToDate = this.getToDate.bind(this);
    this.entry = props.entry;
    this.formInputsComponent = (props) => <BackgroundFormInputs {...props} />;
    this.cardInfo = (
      <>
        <p className={`${props.wrapper}-preview-info ${props.inputOneName}`}>
          {this.entry[props.inputOneName]}
        </p>

        <p className={`${props.wrapper}-preview-info ${props.inputTwoName}`}>
          {this.entry[props.inputTwoName]}
        </p>

        <p className={`${props.wrapper}-preview-info date`}>
          <span className="from">{this.getFromDate(this.entry.fromDate)}</span>
          <span className="separator">-</span>
          <span className="to">
            {this.entry.inProgress
              ? "Present"
              : this.getToDate(this.entry.toDate)}
          </span>
        </p>
      </>
    );
  }

  render() {
    return super.render();
  }
}
