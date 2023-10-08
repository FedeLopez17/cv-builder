import React from "react";
import BasePreview from "./BaseCardPreview";
import ReferenceFormInputs from "./ReferenceFormInputs";

export default class ReferencePreview extends BasePreview {
  constructor(props) {
    super(props);
    this.entry = props.entry;
    this.formInputsComponent = (props) => <ReferenceFormInputs {...props} />;
    this.cardInfo = (
      <>
        <p className="reference-preview-full-name">
          {this.entry.name} {this.entry.lastName}
        </p>
        <p className="reference-preview-role">{this.entry.role}</p>
        <p className="reference-preview-company">{this.entry.company}</p>
      </>
    );
  }

  render() {
    return super.render();
  }
}
