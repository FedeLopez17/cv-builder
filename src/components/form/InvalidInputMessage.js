import React from "react";
import "../../styles/InvalidInputMessage.css";

export default class InvalidInputMessage extends React.Component {
  render() {
    const defaultMessage = "Please fill this input correctly";
    const message = this.props.message || defaultMessage;

    return <p className="invalid-input-message">{message}</p>;
  }
}
