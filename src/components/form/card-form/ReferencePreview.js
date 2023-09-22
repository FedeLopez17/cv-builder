import React from "react";
import BasePreview from "./BaseCardPreview";
import ReferenceFormInputs from "./ReferenceFormInputs";

export default class ReferencePreview extends BasePreview {
  render() {
    const { entry } = this.props;

    return super.render({
      entry,
      formInputsComponent: (props) => <ReferenceFormInputs {...props} />,
      cardInfo: (
        <>
          <p className="reference-preview-full-name">
            {entry.name} {entry.lastName}
          </p>
          <p className="reference-preview-role">{entry.role}</p>
          <p className="reference-preview-company">{entry.company}</p>
        </>
      ),
    });
  }
}
