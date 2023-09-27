import React from "react";
import "../../styles/form/RequiredFieldIndicator.css";

export default class RequiredFieldIndicator extends React.Component {
  render() {
    return (
      <span className="required-field-indicator" title="required">
        *
      </span>
    );
  }
}
